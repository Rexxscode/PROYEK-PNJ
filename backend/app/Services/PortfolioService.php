<?php

namespace App\Services;

use App\Repositories\PortfolioRepository;
use App\Repositories\StudentRepository;
use Illuminate\Validation\ValidationException;

class PortfolioService
{
    public function __construct(
        private PortfolioRepository $portfolios,
        private StudentRepository $students,
    ) {}

    public function projects(int $userId): array
    {
        $student = $this->requireStudent($userId);

        $projects = $this->portfolios->projectsForStudent($student->id);

        return [
            'data' => $projects->map(fn ($project) => $this->formatProject($project)),
        ];
    }

    public function save(int $userId, array $data): array
    {
        $student = $this->requireStudent($userId);

        $project = $this->portfolios->createForStudent($student->id, [
            'title' => $data['title'],
            'description' => $data['description'],
            'skills_json' => json_encode($data['skills'] ?? []),
            'project_url' => $data['projectUrl'] ?? null,
            'completed_at' => $data['completedAt'] ?? null,
        ]);

        return [
            'data' => $this->formatProject($project),
        ];
    }

    public function publicBySlug(string $slug): array
    {
        $student = $this->students->findByNameSlug($slug);

        if (!$student) {
            throw ValidationException::withMessages([
                'student' => 'Student not found',
            ]);
        }

        $projects = $this->portfolios->projectsForStudent($student->id);

        return [
            'user' => [
                'name' => $student->user->name,
                'email' => $student->user->email,
                'major' => $student->major->name ?? null,
            ],
            'projects' => $projects->map(fn ($project) => $this->formatProject($project)),
        ];
    }

    private function requireStudent(int $userId)
    {
        $student = $this->students->findById($userId);

        if (!$student) {
            throw ValidationException::withMessages([
                'student' => 'Student profile not found',
            ]);
        }

        return $student;
    }

    private function formatProject($project): array
    {
        return [
            'id' => $project->id,
            'title' => $project->title,
            'description' => $project->description,
            'skills' => $project->skills_json ? json_decode($project->skills_json, true) : [],
            'projectUrl' => $project->project_url,
            'completedAt' => $project->completed_at,
        ];
    }
}
