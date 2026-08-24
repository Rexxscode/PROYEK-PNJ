<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserProfileResource;
use App\Models\AppNotification;
use App\Models\RoadmapMilestone;
use App\Models\StudentSkill;
use App\Models\User;
use App\Services\MatchingService;
use App\Services\StudentDataService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class StudentController extends Controller
{
    use AuthorizesRequests;

    public function __construct(private readonly StudentDataService $data)
    {
    }

    /**
     * GET /api/students — daftar semua siswa (admin).
     */
    public function index(): JsonResponse
    {
        $students = User::query()
            ->where('role', 'student')
            ->orderBy('name')
            ->get();

        return response()->json(UserProfileResource::collection($students)->resolve());
    }

    /**
     * GET /api/students/{id} — admin atau siswa itu sendiri.
     */
    public function show(User $student): JsonResponse
    {
        $this->authorize('view', $student);

        return response()->json($this->data->studentData($student));
    }

    /**
     * PUT /api/students/{id} — hanya pemilik akun.
     */
    public function update(Request $request, User $student): JsonResponse
    {
        $this->authorize('update', $student);

        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:100'],
            'major' => ['sometimes', 'string', 'max:100'],
            'grade' => ['sometimes', 'string', 'max:10'],
            'avatar' => ['sometimes', 'nullable', 'string', 'max:255'],
        ]);

        if (isset($validated['name']) && $validated['name'] !== $student->name) {
            $base = Str::slug($validated['name']) ?: Str::random(8);
            $slug = $base;
            $attempt = 1;
            while (User::where('slug', $slug)->where('id', '!=', $student->id)->exists()) {
                $slug = $base.'-'.(++$attempt);
            }
            $validated['slug'] = $slug;
        }

        $student->update($validated);

        return response()->json(new UserProfileResource($student->refresh()));
    }

    /**
     * GET /api/students/{id}/portfolio.
     */
    public function portfolio(User $student): JsonResponse
    {
        $this->authorize('view', $student);

        return response()->json($this->data->portfolio($student));
    }

    /**
     * GET /api/students/{id}/roadmap.
     */
    public function roadmap(User $student): JsonResponse
    {
        $this->authorize('view', $student);

        return response()->json($this->data->roadmapOf($student));
    }

    /**
     * PUT /api/students/{id}/roadmap/{milestoneId} — hanya pemilik milestone.
     *
     * Body: { "status": "locked|available|in_progress|completed" }
     */
    public function updateMilestone(Request $request, User $student, RoadmapMilestone $milestone): JsonResponse
    {
        $this->authorize('update', $student);

        if ($milestone->user_id !== $student->id) {
            abort(404);
        }

        $validated = $request->validate([
            'status' => ['required', Rule::in(['locked', 'available', 'in_progress', 'completed'])],
        ]);

        $milestone->update(['status' => $validated['status']]);

        return response()->json([
            'id' => 'rm-'.$milestone->id,
            'title' => $milestone->title,
            'description' => $milestone->description ?? '',
            'status' => $milestone->status,
            'skills' => $milestone->skills ?? [],
            'estimatedHours' => (int) $milestone->estimated_hours,
            'resources' => collect($milestone->resources ?? [])->map(fn ($r) => [
                'title' => $r['title'] ?? '',
                'url' => $r['url'] ?? '',
                'type' => $r['type'] ?? 'article',
            ])->values()->all(),
        ]);
    }

    /**
     * POST /api/students/{id}/assessment.
     *
     * Body: [{"skillId": 1, "level": 4}, ...]
     * Proses (dalam transaksi): upsert student_skills -> set assessed_at ->
     * sinkron student_career_matches -> generate roadmap dari gap karier teratas
     * -> notifikasi ke admin -> kembalikan careerMatches + skillGaps.
     */
    public function submitAssessment(Request $request, User $student): JsonResponse
    {
        $this->authorize('update', $student);

        $validated = $request->validate([
            '*.skillId' => ['required', 'integer', 'exists:skills,id'],
            '*.level' => ['required', 'integer', 'min:1', 'max:5'],
        ]);

        if ($validated === []) {
            // Tanpa ini, body kosong "lolos" senyap lalu matching jalan atas state lama.
            abort(422, 'Payload asesmen tidak boleh kosong');
        }

        $result = DB::transaction(function () use ($validated, $student) {
            foreach ($validated as $answer) {
                StudentSkill::updateOrCreate(
                    ['user_id' => $student->id, 'skill_id' => $answer['skillId']],
                    ['level' => $answer['level']]
                );
            }

            $student->forceFill(['assessed_at' => now()])->save();

            // Satu snapshot level diambil SETELAH seluruh upsert selesai,
            // dipakai bersama oleh matching, roadmap, dan skillGaps pada response.
            $levels = MatchingService::skillLevelsOf($student);

            $matches = app(MatchingService::class)->syncMatches($student, $levels);

            $top = $matches->first();
            if ($top !== null) {
                $this->generateRoadmapFromGaps($student, $top['career'], $levels);
            }

            AppNotification::create([
                'target_role' => 'admin',
                'type' => 'assessment_done',
                'text' => $student->name.' menyelesaikan asesmen dengan '.count($validated).' skill dinilai',
            ]);

            return $matches;
        });

        return response()->json([
            'careerMatches' => $this->data->careerMatchesOf($student),
            'skillGaps' => $this->data->skillGapsForTopMatch($student, MatchingService::skillLevelsOf($student)),
        ]);
    }

    /**
     * Milestone dibuat dari skill gap karier teratas:
     * gap pertama "available", sisanya "locked".
     */
    private function generateRoadmapFromGaps(User $student, \App\Models\Career $career, array $levels): void
    {
        $gaps = app(MatchingService::class)->gapsFor($career, $levels);

        if ($gaps === []) {
            return;
        }

        $nextSequence = (int) ($student->roadmapMilestones()->max('sequence') ?? 0);

        foreach ($gaps as $index => $gap) {
            RoadmapMilestone::updateOrCreate(
                [
                    'user_id' => $student->id,
                    'title' => 'Pelajari '.$gap['skillName'],
                ],
                [
                    'description' => sprintf(
                        'Tutup skill gap untuk karier %s: tingkatkan %s dari level %d ke level %d.',
                        $career->title, $gap['skillName'], $gap['currentLevel'], $gap['requiredLevel']
                    ),
                    'status' => $index === 0 ? 'available' : 'locked',
                    'estimated_hours' => 8,
                    'sequence' => ++$nextSequence,
                    'skills' => [$gap['skillName']],
                    'resources' => [],
                ]
            );
        }
    }
}
