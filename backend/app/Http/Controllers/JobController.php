<?php

namespace App\Http\Controllers;

use App\Http\Requests\JobRequest;
use App\Models\AppNotification;
use App\Models\Job;
use App\Models\Skill;
use App\Services\MatchingService;
use App\Services\StudentDataService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class JobController extends Controller
{
    use AuthorizesRequests;

    /**
     * GET /api/jobs — token optional.
     * Student mendapat matchPercentage personal (terurut paling cocok),
     * role lain / guest mendapat matchPercentage 0 terurut terbaru.
     */
    public function index(Request $request): JsonResponse
    {
        $jobs = Job::with('skills')->orderByDesc('posted_at')->get();
        // Guard sanctum eksplisit karena route ini tidak memakai middleware auth
        $user = $request->user('sanctum');
        $isStudent = (bool) ($user && $user->role === 'student');
        $levels = $isStudent ? MatchingService::skillLevelsOf($user) : [];

        $list = $jobs
            ->map(function (Job $job) use ($levels) {
                $percentage = MatchingService::jobPercentage($job, $levels);
                $formatted = StudentDataService::formatJob($job, $percentage);

                return ['percentage' => $percentage, 'formatted' => $formatted];
            })
            ->when($isStudent, function ($list) {
                return $list->filter(fn (array $row) => $row['percentage'] > 0)
                    ->sortByDesc('percentage');
            })
            ->values()
            ->map(fn (array $row) => $row['formatted']);

        return response()->json($list->all());
    }

    /**
     * POST /api/jobs — hanya industry.
     */
    public function store(JobRequest $request): JsonResponse
    {
        $fields = $request->jobFields();

        $job = DB::transaction(function () use ($request, $fields) {
            $job = Job::create($fields + [
                'posted_by' => $request->user()->id,
                'posted_at' => now(),
            ]);

            static::syncSkills($job, $request->input('requiredSkills', []));

            AppNotification::create([
                'target_role' => 'student',
                'type' => 'job_posted',
                'text' => "Lowongan baru: {$job->title} di {$job->company}",
            ]);

            return $job->load('skills');
        });

        return response()->json(StudentDataService::formatJob($job, 0), 201);
    }

    /**
     * PUT /api/jobs/{id} — hanya pemilik lowongan.
     */
    public function update(JobRequest $request, Job $job): JsonResponse
    {
        $this->authorize('update', $job);

        DB::transaction(function () use ($request, $job) {
            $job->update($request->jobFields());

            if ($request->has('requiredSkills')) {
                static::syncSkills($job, $request->input('requiredSkills', []));
            }
        });

        return response()->json(StudentDataService::formatJob($job->refresh()->load('skills'), 0));
    }

    /**
     * DELETE /api/jobs/{id} — hanya pemilik lowongan.
     */
    public function destroy(Job $job): JsonResponse
    {
        $this->authorize('update', $job);

        $job->delete();

        return response()->json(['success' => true]);
    }

    /**
     * Sinkron skill lowongan; skill baru otomatis masuk master skills (hard).
     */
    private static function syncSkills(Job $job, array $skillNames): void
    {
        $ids = [];
        foreach ($skillNames as $name) {
            $name = trim($name);
            if ($name === '') {
                continue;
            }
            $ids[] = Skill::firstOrCreate(['name' => $name], ['category' => 'hard'])->id;
        }

        if ($ids === []) {
            $job->skills()->detach();
        } else {
            $job->skills()->sync($ids);
        }
    }
}
