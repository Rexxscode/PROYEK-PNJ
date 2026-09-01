<?php

namespace App\Repositories;

use App\Models\AssessmentResult;
use App\Models\Industry;
use App\Models\Major;
use App\Models\Student;
use App\Models\User;

class StatisticsRepository
{
    public function totalStudents(): int
    {
        return Student::count();
    }

    public function assessedStudents(): int
    {
        return AssessmentResult::distinct('student_id')->count('student_id');
    }

    public function totalIndustries(): int
    {
        return Industry::count();
    }

    public function pendingIndustries(): int
    {
        return Industry::where('status', 'pending')->count();
    }

    public function pendingCards(): int
    {
        return Student::where('card_status', 'pending')->count();
    }

    public function averageReadiness(): int
    {
        // Readiness derived from the latest assessment percentage per student.
        $rows = AssessmentResult::select('student_id')
            ->selectRaw('MAX(percentage) as pct')
            ->groupBy('student_id')
            ->get();

        if ($rows->isEmpty()) {
            return 0;
        }

        return (int) round($rows->avg('pct') ?? 0);
    }

    public function readinessByMajor(): array
    {
        $majors = Major::with('students.assessmentResults')->get();

        return $majors->map(function ($major) {
            $scores = $major->students->flatMap(fn ($s) => $s->assessmentResults->pluck('percentage'))->filter();

            $score = $scores->isEmpty() ? 0 : (int) round($scores->avg());

            return [
                'major' => $major->name,
                'score' => $score,
            ];
        })->values()->toArray();
    }

    public function topCareers(int $limit = 5): array
    {
        // Top skills from latest assessment skill_scores per student.
        $results = AssessmentResult::get(['skill_scores']);

        $skillCount = [];

        foreach ($results as $result) {
            $scores = $result->skill_scores ? json_decode($result->skill_scores, true) : [];
            foreach (array_keys($scores) as $skill) {
                $skillCount[$skill] = ($skillCount[$skill] ?? 0) + 1;
            }
        }

        arsort($skillCount);

        $top = array_slice($skillCount, 0, $limit, true);

        return array_map(fn ($name, $count) => ['name' => $name, 'count' => $count], array_keys($top), $top);
    }

    public function monthlyRegistrations(int $months = 6): array
    {
        $driver = config('database.default');

        $expr = $driver === 'sqlite'
            ? "strftime('%Y-%m', created_at)"
            : "DATE_FORMAT(created_at, '%Y-%m')";

        $rows = User::selectRaw("{$expr} as month, count(*) as total")
            ->where('created_at', '>=', now()->subMonths($months)->startOfMonth())
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return $rows->map(fn ($r) => [
            'month' => $r->month,
            'count' => (int) $r->total,
        ])->toArray();
    }
}
