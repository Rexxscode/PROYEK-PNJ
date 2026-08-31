<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Student;
use App\Models\Major;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class IndustryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->role !== 'industry') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: industry account required',
            ], 403);
        }

        $industry = $user->industry;
        if (!$industry) {
            return response()->json([
                'success' => false,
                'message' => 'Industry profile not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $industry->id,
                'user_id' => $user->id,
                'company' => $industry->company,
                'industry' => $industry->industry,
                'location' => $industry->location,
                'website' => $industry->website,
                'description' => $industry->description,
                'founded' => $industry->founded,
                'employee_count' => $industry->employee_count,
            ],
        ]);
    }

    public function profile(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->role !== 'industry') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: industry account required',
            ], 403);
        }

        $industry = $user->industry;
        if (!$industry) {
            return response()->json([
                'success' => false,
                'message' => 'Industry profile not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'company' => $industry->company,
                'industry' => $industry->industry,
                'location' => $industry->location,
                'website' => $industry->website,
                'description' => $industry->description,
                'founded' => $industry->founded,
                'employee_count' => $industry->employee_count,
            ],
        ]);
    }

    public function updateProfile(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->role !== 'industry') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: industry account required',
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'company' => 'required|string|max:255',
            'industry' => 'required|string',
            'location' => 'nullable|string',
            'website' => 'nullable|string|url',
            'description' => 'nullable|string',
            'founded' => 'nullable|string',
            'employee_count' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $industry = $user->industry;
        if (!$industry) {
            $industry = $user->industry()->create([
                'user_id' => $user->id,
                'company' => $request->post('company'),
                'industry' => $request->post('industry'),
                'location' => $request->post('location'),
                'website' => $request->post('website'),
                'description' => $request->post('description'),
                'founded' => $request->post('founded'),
                'employee_count' => $request->post('employee_count'),
            ]);
        } else {
            $industry->update([
                'company' => $request->post('company'),
                'industry' => $request->post('industry'),
                'location' => $request->post('location'),
                'website' => $request->post('website'),
                'description' => $request->post('description'),
                'founded' => $request->post('founded'),
                'employee_count' => $request->post('employee_count'),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'data' => $this->formatProfile($industry),
        ]);
    }

    /**
     * @param \App\Models\Industry $industry
     * @return array<string, mixed>
     */
    private function formatProfile($industry): array
    {
        return [
            'company' => $industry->company,
            'industry' => $industry->industry,
            'location' => $industry->location,
            'website' => $industry->website,
            'description' => $industry->description,
            'founded' => $industry->founded,
            'employee_count' => $industry->employee_count,
        ];
    }

    public function candidates(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->role !== 'industry') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: industry account required',
            ], 403);
        }

        $industry = $user->industry;
        if (!$industry) {
            return response()->json([
                'success' => false,
                'message' => 'Industry profile not found',
            ], 404);
        }

        $skillFilter = $request->query('skills');

        // ambil semua students
        $students = Student::with('user', 'major')
            ->when($skillFilter, function ($query, $skills) {
                $skillNames = is_array($skills) ? $skills : explode(',', $skills);
                $query->whereHas('skills', function ($q) use ($skillNames) {
                    foreach ($skillNames as $skillName) {
                        $q->where('name', 'like', '%' . trim($skillName) . '%');
                    }
                });
            })
            ->get();

        $allStudents = []; // dari mock-data atau database
        $matchedStudents = [];

        foreach ($students as $student) {
            $studentSkillNames = $student->skills->pluck('name')->toArray();
            $matchedSkills = [];
            if ($skillFilter) {
                $skillNames = is_array($skillFilter) ? $skillFilter : explode(',', $skillFilter);
                foreach ($skillNames as $skill) {
                    if (in_array(trim($skill), array_map('strtolower', $studentSkillNames))) {
                        $matchedSkills[] = trim($skill);
                    }
                }
            } else {
                $matchedSkills = $studentSkillNames;
            }

            $matchCount = count($matchedSkills);
            $score = count($skillFilter) > 0
                ? round(count($matchedSkills) / count($skillFilter) * 100)
                : 100;

            $topSkill = $matchedSkills[0] ?? $student->hardSkills[0]?->name ?? "-";

            $matchFor = null;
            if (count($student->careerMatches) > 0) {
                $best = $student->careerMatches[0];
                foreach ($student->careerMatches as $cm) {
                    if ($cm->matchPercentage > $best->matchPercentage) {
                        $best = $cm;
                    }
                }
                $matchFor = $best;
            }

            $matchedStudents[] = [
                'name' => $student->user->name,
                'major' => $student->major?->name,
                'score' => $score,
                'matchedSkills' => $matchedSkills,
                'topSkill' => $topSkill,
                'matchFor' => $matchFor,
            ];
        }

        return response()->json([
            'success' => true,
            'data' => [
                'candidates' => $matchedStudents,
                'total' => count($matchedStudents),
            ],
        ]);
    }

    public function jobs(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->role !== 'industry') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: industry account required',
            ], 403);
        }

        $jobs = \App\Models\Job::where('user_id', $user->id)->get();

        return response()->json([
            'success' => true,
            'data' => $jobs->map(function ($job) {
                return [
                    'id' => $job->id,
                    'title' => $job->title,
                    'company' => $job->company,
                    'location' => $job->location,
                    'type' => $job->type,
                    'description' => $job->description,
                    'skills' => $job->skills ? json_decode($job->skills, true) : [],
                    'matchPercentage' => $job->match_percentage ?? 0,
                    'postedAt' => $job->created_at,
                    'deadline' => $job->deadline,
                ];
            }),
        ]);
    }

    public function createJob(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->role !== 'industry') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: industry account required',
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'location' => 'required|string',
            'type' => 'required|in:magang,fulltime,parttime,freelance',
            'description' => 'required|string',
            'skills' => 'required|array',
            'deadline' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $job = \App\Models\Job::create([
            'user_id' => $user->id,
            'title' => $request->post('title'),
            'company' => $request->post('company'),
            'location' => $request->post('location'),
            'type' => $request->post('type'),
            'description' => $request->post('description'),
            'skills' => json_encode($request->post('skills')),
            'match_percentage' => 0,
            'deadline' => $request->post('deadline'),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Job posted successfully',
            'data' => [
                'id' => $job->id,
                'title' => $job->title,
                'company' => $job->company,
                'location' => $job->location,
                'type' => $job->type,
                'description' => $job->description,
                'skills' => json_decode($job->skills, true) ?? [],
                'matchPercentage' => $job->match_percentage ?? 0,
                'postedAt' => $job->created_at,
                'deadline' => $job->deadline,
            ],
        ]);
    }

    public function updateJob(Request $request, string $id): JsonResponse
    {
        $user = $request->user();

        if ($user->role !== 'industry') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: industry account required',
            ], 403);
        }

        $job = \App\Models\Job::where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'company' => 'sometimes|required|string|max:255',
            'location' => 'sometimes|required|string',
            'type' => 'sometimes|required|in:magang,fulltime,parttime,freelance',
            'description' => 'sometimes|required|string',
            'skills' => 'sometimes|required|array',
            'deadline' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $job->update([
            'title' => $request->post('title') ?? $job->title,
            'company' => $request->post('company') ?? $job->company,
            'location' => $request->post('location') ?? $job->location,
            'type' => $request->post('type') ?? $job->type,
            'description' => $request->post('description') ?? $job->description,
            'skills' => $request->post('skills') ?? json_encode($job->skills),
            'deadline' => $request->post('deadline') ?? $job->deadline,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Job updated successfully',
            'data' => [
                'id' => $job->id,
                'title' => $job->title,
                'company' => $job->company,
                'location' => $job->location,
                'type' => $job->type,
                'description' => $job->description,
                'skills' => json_decode($job->skills, true) ?? [],
                'matchPercentage' => $job->match_percentage ?? 0,
                'postedAt' => $job->created_at,
                'deadline' => $job->deadline,
            ],
        ]);
    }

    public function deleteJob(Request $request, string $id): JsonResponse
    {
        $user = $request->user();

        if ($user->role !== 'industry') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: industry account required',
            ], 403);
        }

        $job = \App\Models\Job::where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        $job->delete();

        return response()->json([
            'success' => true,
            'message' => 'Job deleted successfully',
        ]);
    }
}