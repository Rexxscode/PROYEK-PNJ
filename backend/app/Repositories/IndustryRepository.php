<?php

namespace App\Repositories;

use App\Models\Industry;
use App\Models\Job;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class IndustryRepository extends Repository
{
    protected function model(): string
    {
        return Industry::class;
    }

    public function findForUser(int $userId): ?Industry
    {
        return Industry::where('user_id', $userId)->first();
    }

    public function jobsFor(Industry $industry): Collection
    {
        return $industry->jobs()->with('skills')->get();
    }

    public function findJobForIndustry(Industry $industry, string $jobId): ?Job
    {
        return Job::where('id', $jobId)
            ->where('industry_id', $industry->id)
            ->first();
    }
}
