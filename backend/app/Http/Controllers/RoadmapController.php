<?php

namespace App\Http\Controllers;

use App\Models\Major;
use App\Models\RoadmapMilestone;
use App\Models\RoadmapResource;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class RoadmapController extends Controller
{
    public function index(Request $request): JsonResponse
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

        // ambil score dari query parameter
        $score = (int)($request->query('score', 0));

        // ambil major dari student
        $majorId = $student->major_id;

        // dapatkan semua milestone untuk major ini
        $milestones = RoadmapMilestone::where('major_id', $majorId)
            ->get();

        // threshold: fundamental = 0-50, intermediate = 51-70, advanced = 71+
        $thresholds = [
            'fundamental' => 0,
            'intermediate' => 50,
            'advanced' => 70,
        ];

        $processedMilestones = [];

        foreach ($milestones as $milestone) {
            // tentukan status berdasarkan score
            $status = 'locked';
            if ($score >= $thresholds['advanced']) {
                $status = 'completed';
            } elseif ($score >= $thresholds['intermediate']) {
                $status = 'in_progress';
            } elseif ($score >= $thresholds['fundamental']) {
                $status = 'available';
            }

            // dapatkan resources untuk milestone ini
            $resources = RoadmapResource::where('milestone_id', $milestone->id)
                ->get()
                ->map(function ($resource) {
                    return [
                        'title' => $resource->title,
                        'url' => $resource->url,
                        'type' => $resource->type,
                    ];
                })
                ->toArray();

            // dapatkan progress dari student_roadmap_progress
            $progress = $this->getProgress($student->id, $milestone->id);

            $processedMilestones[] = [
                'id' => $milestone->id,
                'title' => $milestone->title,
                'description' => $milestone->description,
                'status' => $status,
                'level' => $milestone->level,
                'estimatedHours' => $milestone->estimated_hours,
                'skills' => [],
                'resources' => $resources,
                'progress' => $progress,
            ];
        }

        return response()->json([
            'success' => true,
            'data' => [
                'major_id' => $majorId,
                'score' => $score,
                'milestones' => $processedMilestones,
            ],
        ]);
    }

    public function progress(Request $request): JsonResponse
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

        $milestoneId = $request->query('milestone_id');

        if ($milestoneId) {
            // ambil progress spesifik milestone
            $progress = $this->getProgress($student->id, $milestoneId);

            return response()->json([
                'success' => true,
                'data' => [
                    'milestone_id' => $milestoneId,
                    'progress' => $progress,
                ],
            ]);
        }

        // ambil semua progress untuk major student
        $milestones = RoadmapMilestone::where('major_id', $student->major_id)
            ->get();

        $progressData = [];
        foreach ($milestones as $milestone) {
            $progressData[$milestone->id] = $this->getProgress($student->id, $milestone->id);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'major_id' => $student->major_id,
                'progress' => $progressData,
            ],
        ]);
    }

    public function updateProgress(Request $request): JsonResponse
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
            'milestone_id' => 'required|string',
            'status' => 'required|in:not_started,in_progress,completed',
            'resources_viewed' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $milestoneId = $request->post('milestone_id');
        $status = $request->post('status');
        $resourcesViewed = $request->post('resources_viewed') ?? [];

        $data = [
            'student_id' => $student->id,
            'milestone_id' => $milestoneId,
            'status' => $status,
            'resources_viewed' => json_encode($resourcesViewed),
            'completed_at' => $status === 'completed' ? now() : null,
            'updated_at' => now(),
        ];

        $exists = \App\Models\StudentRoadmapProgress::where('student_id', $student->id)
            ->where('milestone_id', $milestoneId)
            ->exists();

        if ($exists) {
            \App\Models\StudentRoadmapProgress::where('student_id', $student->id)
                ->where('milestone_id', $milestoneId)
                ->update($data);
        } else {
            $data['created_at'] = now();
            \App\Models\StudentRoadmapProgress::insert($data);
        }

        return response()->json([
            'success' => true,
            'message' => 'Progress updated successfully',
            'data' => [
                'milestone_id' => $milestoneId,
                'status' => $status,
                'resources_viewed' => $resourcesViewed,
            ],
        ]);
    }

    private function getProgress(string $studentId, string $milestoneId): array
    {
        $progress = \App\Models\StudentRoadmapProgress::where('student_id', $studentId)
            ->where('milestone_id', $milestoneId)
            ->first();

        if ($progress) {
            return [
                'status' => $progress->status,
                'resources_viewed' => $progress->resources_viewed,
                'completed_at' => $progress->completed_at?->toISOString(),
            ];
        }

        return [
            'status' => 'locked',
            'resources_viewed' => 0,
            'completed_at' => null,
        ];
    }
}