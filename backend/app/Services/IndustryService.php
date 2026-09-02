<?php

namespace App\Services;

use App\Repositories\IndustryRepository;
use App\Repositories\StudentRepository;
use App\Repositories\SkillRepository;
use Illuminate\Validation\ValidationException;

class IndustryService
{
    public function __construct(
        private IndustryRepository $industries,
        private StudentRepository $students,
        private SkillRepository $skills,
    ) {}

    public function profileForUser(int $userId): array
    {
        $industry = $this->requireIndustry($userId);

        return [
            'data' => $this->formatProfile($industry),
        ];
    }

    public function updateProfile(int $userId, array $data): array
    {
        $industry = $this->industries->findForUser($userId);

        $payload = [
            'company' => $data['company'],
            'industry' => $data['industry'],
            'location' => $data['location'] ?? null,
            'website' => $data['website'] ?? null,
            'description' => $data['description'] ?? null,
            'founded' => $data['founded'] ?? null,
            'employee_count' => $data['employee_count'] ?? $data['employeeCount'] ?? null,
        ];

        if ($industry) {
            $this->industries->update($industry, $payload);
        } else {
            $payload['user_id'] = $userId;
            $industry = $this->industries->create($payload);
        }

        return [
            'data' => $this->formatProfile($industry),
        ];
    }

    public function candidates(int $userId, ?string $skillFilter): array
    {
        $this->requireIndustry($userId);

        $students = $this->students->withRelations();

        $matchedStudents = [];

        foreach ($students as $student) {
            $studentSkillNames = $student->skills->pluck('name')->map(fn ($n) => strtolower($n))->toArray();
            $matchedSkills = [];

            if ($skillFilter) {
                $skillNames = is_array($skillFilter) ? $skillFilter : explode(',', $skillFilter);
                foreach ($skillNames as $skill) {
                    if (in_array(strtolower(trim($skill)), $studentSkillNames)) {
                        $matchedSkills[] = trim($skill);
                    }
                }
            } else {
                $matchedSkills = $student->skills->pluck('name')->toArray();
            }

            $filterCount = $skillFilter ? count(is_array($skillFilter) ? $skillFilter : explode(',', $skillFilter)) : 0;
            $score = $filterCount > 0
                ? round(count($matchedSkills) / $filterCount * 100)
                : 100;

            $matchedStudents[] = [
                'name' => $student->user->name,
                'major' => $student->major?->name,
                'score' => $score,
                'matchedSkills' => $matchedSkills,
                'topSkill' => $matchedSkills[0] ?? '-',
            ];
        }

        return [
            'candidates' => $matchedStudents,
            'total' => count($matchedStudents),
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
}
