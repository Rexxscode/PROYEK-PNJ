<?php

namespace App\Services;

use App\Repositories\StatisticsRepository;
use Illuminate\Support\Facades\DB;

class StatisticsService
{
    public function __construct(
        private StatisticsRepository $statistics,
    ) {}

    public function dashboard(): array
    {
        $totalStudents = $this->statistics->totalStudents();
        $assessedStudents = $this->statistics->assessedStudents();

        return [
            'data' => [
                'totalStudents' => $totalStudents,
                'assessedStudents' => $assessedStudents,
                'assessedPercentage' => $totalStudents > 0 ? round(($assessedStudents / $totalStudents) * 100) : 0,
                'avgReadinessScore' => $this->statistics->averageReadiness(),
                'totalIndustries' => $this->statistics->totalIndustries(),
                'pendingIndustries' => $this->statistics->pendingIndustries(),
                'pendingCards' => $this->statistics->pendingCards(),
                'topCareers' => $this->statistics->topCareers(),
                'readinessByMajor' => $this->statistics->readinessByMajor(),
                'monthlyRegistrations' => $this->statistics->monthlyRegistrations(),
            ],
        ];
    }

    public function readinessDistribution(): array
    {
        $rows = DB::table('assessment_results')
            ->select('student_id')
            ->selectRaw('MAX(percentage) as pct')
            ->groupBy('student_id')
            ->get();

        $buckets = [
            ['label' => 'Siap Kerja (85-100%)', 'key' => 'siap', 'count' => 0],
            ['label' => 'Hampir Siap (70-84%)', 'key' => 'hampir', 'count' => 0],
            ['label' => 'Berkembang (50-69%)', 'key' => 'berkembang', 'count' => 0],
            ['label' => 'Eksplorasi (0-49%)', 'key' => 'eksplorasi', 'count' => 0],
        ];

        foreach ($rows as $row) {
            $pct = (int) $row->pct;
            if ($pct >= 85) {
                $buckets[0]['count']++;
            } elseif ($pct >= 70) {
                $buckets[1]['count']++;
            } elseif ($pct >= 50) {
                $buckets[2]['count']++;
            } else {
                $buckets[3]['count']++;
            }
        }

        return ['data' => $buckets];
    }
}
