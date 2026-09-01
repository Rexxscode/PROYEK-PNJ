<?php

namespace App\Repositories;

use App\Models\Job;
use App\Models\Skill;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class JobRepository extends Repository
{
    protected function model(): string
    {
        return Job::class;
    }

    public function publicList(?string $type): Collection
    {
        $query = Job::with('industry', 'skills');

        if ($type) {
            $query->where('type', $type);
        }

        return $query->get();
    }

    public function paginatePublicList(?string $type, int $perPage, string $search = '')
    {
        $query = Job::with('industry', 'skills');

        if ($type) {
            $query->where('type', $type);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%");
            });
        }

        return $query->paginate($perPage);
    }

    public function findWithRelations($id): ?Job
    {
        return Job::with('industry', 'skills')->find($id);
    }

    public function jobsForIndustry(int $industryId): Collection
    {
        return Job::where('industry_id', $industryId)->with('skills')->get();
    }

    public function findForIndustry(int $industryId, string $jobId): ?Job
    {
        return Job::where('id', $jobId)
            ->where('industry_id', $industryId)
            ->first();
    }

    public function createForIndustry(int $industryId, array $data): Job
    {
        $data['industry_id'] = $industryId;

        return Job::create($data);
    }

    public function syncSkills(Job $job, array $skillNames): void
    {
        $skillIds = [];

        foreach ($skillNames as $skillName) {
            $skill = Skill::where('name', $skillName)->first();
            if ($skill) {
                $skillIds[$skill->id] = ['required_level' => 1];
            }
        }

        $job->skills()->sync($skillIds);
    }

    public function attachSkills(Job $job, array $skillNames): void
    {
        foreach ($skillNames as $skillName) {
            $skill = Skill::where('name', $skillName)->first();
            if ($skill) {
                $job->skills()->attach($skill->id, ['required_level' => 1]);
            }
        }
    }
}
