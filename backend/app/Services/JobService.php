<?php

namespace App\Services;

use App\Repositories\IndustryRepository;
use App\Repositories\JobRepository;
use Illuminate\Validation\ValidationException;

class JobService
{
    public function __construct(
        private JobRepository $jobs,
        private IndustryRepository $industries,
    ) {}

    public function publicList(?string $type, ?int $page, ?int $perPage, string $search = ''): array
    {
        if ($page) {
            $perPage = $perPage ?: 10;
            $paginated = $this->jobs->paginatePublicList($type, $perPage, $search);

            return [
                'data' => $paginated->items()->map(fn ($job) => $this->formatList($job)),
                'meta' => [
                    'total' => $paginated->total(),
                    'per_page' => $paginated->perPage(),
                    'current_page' => $paginated->currentPage(),
                    'last_page' => $paginated->lastPage(),
                ],
            ];
        }

        return [
            'data' => $this->jobs->publicList($type)->map(fn ($job) => $this->formatList($job)),
        ];
    }

    public function show(string $id): array
    {
        $job = $this->jobs->findWithRelations($id);

        if (!$job) {
            throw ValidationException::withMessages([
                'job' => 'Job not found',
            ]);
        }

        return [
            'data' => $this->formatList($job),
        ];
    }

    public function mine(int $userId): array
    {
        $industry = $this->requireIndustry($userId);

        return [
            'data' => $this->jobs->jobsForIndustry($industry->id)
                ->map(fn ($job) => $this->formatList($job)),
        ];
    }

    public function store(int $userId, array $data): array
    {
        $industry = $this->requireIndustry($userId);

        $job = $this->jobs->createForIndustry($industry->id, [
            'title' => $data['title'],
            'location' => $data['location'] ?? null,
            'type' => $data['type'],
            'description' => $data['description'],
            'match_percentage' => 0,
            'posted_at' => now(),
            'deadline' => $data['deadline'] ?? null,
        ]);

        $this->jobs->attachSkills($job, $data['skills'] ?? []);

        return [
            'data' => $this->formatList($job),
        ];
    }

    public function update(int $userId, string $id, array $data): array
    {
        $industry = $this->requireIndustry($userId);

        $job = $this->jobs->findForIndustry($industry->id, $id);

        if (!$job) {
            throw ValidationException::withMessages([
                'job' => 'Job not found',
            ]);
        }

        $this->jobs->update($job, [
            'title' => $data['title'] ?? $job->title,
            'location' => $data['location'] ?? $job->location,
            'type' => $data['type'] ?? $job->type,
            'description' => $data['description'] ?? $job->description,
            'deadline' => $data['deadline'] ?? $job->deadline,
        ]);

        if (array_key_exists('skills', $data)) {
            $this->jobs->syncSkills($job, $data['skills']);
        }

        return [
            'data' => $this->formatList($job->fresh('skills')),
        ];
    }

    public function delete(int $userId, string $id): void
    {
        $industry = $this->requireIndustry($userId);

        $job = $this->jobs->findForIndustry($industry->id, $id);

        if (!$job) {
            throw ValidationException::withMessages([
                'job' => 'Job not found',
            ]);
        }

        $this->jobs->delete($job);
    }

    private function requireIndustry(int $userId)
    {
        $industry = $this->industries->findForUser($userId);

        if (!$industry) {
            throw ValidationException::withMessages([
                'industry' => 'Industry profile not found',
            ]);
        }

        return $industry;
    }

    private function formatList($job): array
    {
        return [
            'id' => $job->id,
            'title' => $job->title,
            'company' => $job->industry->company ?? 'Unknown',
            'location' => $job->location,
            'type' => $job->type,
            'description' => $job->description,
            'skills' => $job->skills->pluck('name')->toArray(),
            'matchPercentage' => $job->match_percentage ?? 0,
            'postedAt' => $job->posted_at,
            'deadline' => $job->deadline,
        ];
    }
}
