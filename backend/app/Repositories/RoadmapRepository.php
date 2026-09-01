<?php

namespace App\Repositories;

use App\Models\RoadmapMilestone;
use App\Models\RoadmapResource;
use App\Models\StudentRoadmapProgress;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class RoadmapRepository extends Repository
{
    protected function model(): string
    {
        return RoadmapMilestone::class;
    }

    public function milestonesForMajor(string $majorId): Collection
    {
        return RoadmapMilestone::where('major_id', $majorId)->get();
    }

    public function resourcesForMilestone(string $milestoneId): Collection
    {
        return RoadmapResource::where('milestone_id', $milestoneId)->get();
    }

    public function progressForStudent(int $studentId, string $milestoneId): ?StudentRoadmapProgress
    {
        return StudentRoadmapProgress::where('student_id', $studentId)
            ->where('milestone_id', $milestoneId)
            ->first();
    }

    public function existsProgress(int $studentId, string $milestoneId): bool
    {
        return StudentRoadmapProgress::where('student_id', $studentId)
            ->where('milestone_id', $milestoneId)
            ->exists();
    }

    public function updateProgress(int $studentId, string $milestoneId, array $data): void
    {
        StudentRoadmapProgress::where('student_id', $studentId)
            ->where('milestone_id', $milestoneId)
            ->update($data);
    }

    public function createProgress(array $data): void
    {
        StudentRoadmapProgress::create($data);
    }
}
