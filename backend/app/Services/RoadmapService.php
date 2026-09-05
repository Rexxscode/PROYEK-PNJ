<?php

namespace App\Services;

use App\Models\Student;
use App\Repositories\RoadmapRepository;
use App\Repositories\StudentRepository;
use Illuminate\Validation\ValidationException;

class RoadmapService
{
    public function __construct(
        private RoadmapRepository $roadmaps,
        private StudentRepository $students,
    ) {}

    public function index(int $userId, int $score): array
    {
        $student = $this->requireStudent($userId);

        $milestones = $this->roadmaps->milestonesForMajor($student->major_id);

        $thresholds = [
            'fundamental' => 0,
            'intermediate' => 50,
            'advanced' => 70,
        ];

        $processedMilestones = [];

        foreach ($milestones as $milestone) {
            $status = 'locked';
            if ($score >= $thresholds['advanced']) {
                $status = 'completed';
            } elseif ($score >= $thresholds['intermediate']) {
                $status = 'in_progress';
            } elseif ($score >= $thresholds['fundamental']) {
                $status = 'available';
            }

            $resources = $this->roadmaps->resourcesForMilestone($milestone->id)
                ->map(fn ($resource) => [
                    'title' => $resource->title,
                    'url' => $resource->url,
                    'type' => $resource->type,
                ])
                ->toArray();

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

        return [
            'major_id' => $student->major_id,
            'score' => $score,
            'milestones' => $processedMilestones,
        ];
    }

    public function progress(int $userId, ?string $milestoneId): array
    {
        $student = $this->requireStudent($userId);

        if ($milestoneId) {
            return [
                'milestone_id' => $milestoneId,
                'progress' => $this->getProgress($student->id, $milestoneId),
            ];
        }

        $milestones = $this->roadmaps->milestonesForMajor($student->major_id);

        $progressData = [];
        foreach ($milestones as $milestone) {
            $progressData[$milestone->id] = $this->getProgress($student->id, $milestone->id);
        }

        return [
            'major_id' => $student->major_id,
            'progress' => $progressData,
        ];
    }

    public function updateProgress(int $userId, array $data): array
    {
        $student = $this->requireStudent($userId);

        $milestoneId = $data['milestone_id'];
        $status = $data['status'];
        $resourcesViewed = $data['resources_viewed'] ?? [];

        $progressPayload = [
            'student_id' => $student->id,
            'milestone_id' => $milestoneId,
            'status' => $status,
            'resources_viewed' => $resourcesViewed,
            'completed_at' => $status === 'completed' ? now() : null,
            'updated_at' => now(),
        ];

        if ($this->roadmaps->existsProgress($student->id, $milestoneId)) {
            $this->roadmaps->updateProgress($student->id, $milestoneId, $progressPayload);
        } else {
            $progressPayload['created_at'] = now();
            $this->roadmaps->createProgress($progressPayload);
        }

        return [
            'milestone_id' => $milestoneId,
            'status' => $status,
            'resources_viewed' => $resourcesViewed,
        ];
    }

    private function requireStudent(int $userId): Student
    {
        $student = $this->students->findById($userId);

        if (!$student) {
            throw ValidationException::withMessages([
                'student' => 'Student profile not found',
            ]);
        }

        return $student;
    }

    private function getProgress(int $studentId, string $milestoneId): array
    {
        $progress = $this->roadmaps->progressForStudent($studentId, $milestoneId);

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
