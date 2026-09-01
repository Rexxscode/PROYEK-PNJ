<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class PortfolioController extends Controller
{
    public function projects(Request $request): JsonResponse
    {
        $user = $request->user();

        // gunakan authenticated user → student, jangan percaya student_id dari request
        if ($user->role !== 'student') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: student account required',
            ], 403);
        }

        $student = $user->student;
        if (!$student) {
            return response()->json([
                'success' => false,
                'message' => 'Student profile not found',
            ], 404);
        }

        // ambil projects untuk student ini
        $projects = $student->projects()->get();

        return response()->json([
            'success' => true,
            'data' => $projects->map(function ($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'description' => $project->description,
                    'skills' => $project->skills_json ? json_decode($project->skills_json, true) : [],
                    'projectUrl' => $project->project_url,
                    'completedAt' => $project->completed_at,
                ];
            }),
        ]);
    }

    public function save(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->role !== 'student') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: student account required',
            ], 403);
        }

        $student = $user->student;
        if (!$student) {
            return response()->json([
                'success' => false,
                'message' => 'Student profile not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'skills' => 'nullable|array',
            'projectUrl' => 'nullable|string|url',
            'completedAt' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = [
            'student_id' => $student->id,
            'title' => $request->post('title'),
            'description' => $request->post('description'),
            'skills_json' => json_encode($request->post('skills') ?? []),
            'project_url' => $request->post('projectUrl'),
            'completed_at' => $request->post('completedAt'),
        ];

        $project = $student->projects()->create($data);

        return response()->json([
            'success' => true,
            'message' => 'Project saved successfully',
            'data' => [
                'id' => $project->id,
                'title' => $project->title,
                'description' => $project->description,
                'skills' => json_decode($project->skills_json, true) ?? [],
                'projectUrl' => $project->project_url,
                'completedAt' => $project->completed_at,
            ],
        ]);
    }

    public function public(string $slug): JsonResponse
    {
        $nameSearch = str_replace('-', ' ', $slug);

        $student = Student::whereHas('user', function ($q) use ($nameSearch) {
            $q->whereRaw('LOWER(name) = ?', [strtolower($nameSearch)]);
        })->with(['user', 'major'])->firstOrFail();

        $projects = $student->projects()->get();

        return response()->json([
            'success' => true,
            'data' => [
                'user' => [
                    'name' => $student->user->name,
                    'email' => $student->user->email,
                    'major' => $student->major->name ?? null,
                ],
                'projects' => $projects->map(function ($project) {
                    return [
                        'id' => $project->id,
                        'title' => $project->title,
                        'description' => $project->description,
                        'skills' => $project->skills_json ? json_decode($project->skills_json, true) : [],
                        'projectUrl' => $project->project_url,
                        'completedAt' => $project->completed_at,
                    ];
                }),
            ],
        ]);
    }
}