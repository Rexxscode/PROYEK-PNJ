<?php

namespace App\Services;

use App\Models\Job;
use App\Models\JobApplication;
use App\Repositories\IndustryRepository;
use App\Repositories\JobRepository;
use App\Repositories\StudentRepository;
use Illuminate\Validation\ValidationException;

class JobService
{
    public function __construct(
        private JobRepository $jobs,
        private IndustryRepository $industries,
        private StudentRepository $students,
    ) {}

    public function publicList(?string $type, ?int $page, ?int $perPage, string $search = '', ?int $studentId = null): array
    {
        if ($page) {
            $perPage = $perPage ?: 10;
            $paginated = $this->jobs->paginatePublicList($type, $perPage, $search);

            return [
                'data' => $paginated->items()->map(fn ($job) => $this->formatList($job, $studentId)),
                'meta' => [
                    'total' => $paginated->total(),
                    'per_page' => $paginated->perPage(),
                    'current_page' => $paginated->currentPage(),
                    'last_page' => $paginated->lastPage(),
                ],
            ];
        }

        return [
            'data' => $this->jobs->publicList($type)->map(fn ($job) => $this->formatList($job, $studentId)),
        ];
    }

    public function show(string $id, ?int $studentId = null): array
    {
        $job = $this->jobs->findWithRelations($id);

        if (!$job) {
            throw ValidationException::withMessages([
                'job' => 'Job not found',
            ]);
        }

        return [
            'data' => $this->formatList($job, $studentId),
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
            'salary' => $data['salary'] ?? null,
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
            'salary' => $data['salary'] ?? $job->salary,
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

    /**
     * Apply to a job as a student.
     */
    public function apply(int $studentId, string $jobId): array
    {
        $job = $this->jobs->findWithRelations($jobId);

        if (!$job) {
            throw ValidationException::withMessages([
                'job' => 'Job not found',
            ]);
        }

        if ($this->jobs->hasApplication($job->id, $studentId)) {
            throw ValidationException::withMessages([
                'job' => 'Already applied to this job',
            ]);
        }

        $application = $this->jobs->createApplication($job->id, $studentId);

        return [
            'data' => $this->formatApplication($application->fresh(['job', 'job.industry', 'job.skills']), $studentId),
        ];
    }

    /**
     * List applications made by a student (history).
     */
    public function applicationsForStudent(int $studentId): array
    {
        return [
            'data' => $this->jobs->applicationsForStudent($studentId)
                ->map(fn ($app) => $this->formatApplication($app, $studentId))->values(),
        ];
    }

    /**
     * List applicants for a specific industry's job.
     */
    public function applicationsForJob(int $userId, string $jobId): array
    {
        $industry = $this->requireIndustry($userId);

        $job = $this->jobs->findForIndustry($industry->id, $jobId);

        if (!$job) {
            throw ValidationException::withMessages([
                'job' => 'Job not found',
            ]);
        }

        return [
            'data' => $this->jobs->applicationsForJob($job->id)
                ->map(fn ($app) => $this->formatApplicant($app))->values(),
            'job' => $this->formatList($job),
        ];
    }

    /**
     * Update the status of an application (industry scoped).
     */
    public function setApplicationStatus(int $userId, string $jobId, string $applicationId, string $status): array
    {
        $industry = $this->requireIndustry($userId);

        $job = $this->jobs->findForIndustry($industry->id, $jobId);

        if (!$job) {
            throw ValidationException::withMessages([
                'job' => 'Job not found',
            ]);
        }

        $application = $this->jobs->findApplicationById($applicationId);

        if (!$application || (string) $application->job_id !== (string) $job->id) {
            throw ValidationException::withMessages([
                'application' => 'Application not found',
            ]);
        }

        $application = $this->jobs->setApplicationStatus($application, $status);

        return [
            'data' => $this->formatApplicant($application->fresh(['student', 'student.user', 'student.major', 'student.skills'])),
        ];
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

    /**
     * Compute a match percentage between a job's required skills and a student's skills.
     */
    private function matchFor(Job $job, ?int $studentId = null): int
    {
        if (!$studentId) {
            return 0;
        }

        $jobSkills = $job->skills ? $job->skills->pluck('name')->map(fn ($n) => strtolower($n))->toArray() : [];

        if (empty($jobSkills)) {
            return 0;
        }

        $student = $this->students->find($studentId);

        if (!$student) {
            return 0;
        }

        $studentSkills = $student->skills->pluck('name')->map(fn ($n) => strtolower($n))->toArray();

        $matched = array_values(array_intersect($jobSkills, $studentSkills));

        return round(count($matched) / count($jobSkills) * 100);
    }

    private function formatList($job, ?int $studentId = null): array
    {
        return [
            'id' => $job->id,
            'title' => $job->title,
            'company' => $job->industry->company ?? 'Unknown',
            'location' => $job->location,
            'type' => $job->type,
            'description' => $job->description,
            'skills' => $job->skills->pluck('name')->toArray(),
            'requiredSkills' => $job->skills->pluck('name')->toArray(),
            'matchPercentage' => $this->matchFor($job, $studentId),
            'postedAt' => $job->posted_at,
            'deadline' => $job->deadline,
            'salary' => $job->salary,
        ];
    }

    private function formatApplication(JobApplication $application, int $studentId): array
    {
        $job = $application->job;

        return [
            'id' => $application->id,
            'status' => $application->status,
            'appliedAt' => $application->applied_at,
            'job' => $this->formatList($job, $studentId),
        ];
    }

    private function formatApplicant(JobApplication $application): array
    {
        $student = $application->student;

        return [
            'id' => $application->id,
            'status' => $application->status,
            'appliedAt' => $application->applied_at,
            'name' => $student->user->name ?? 'Unknown',
            'email' => $student->user->email ?? '',
            'major' => $student->major?->name,
            'grade' => $student->grade,
            'skills' => $student->skills->pluck('name')->toArray(),
        ];
    }
}