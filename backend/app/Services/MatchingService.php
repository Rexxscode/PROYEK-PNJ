<?php

namespace App\Services;

use App\Models\Career;
use App\Models\Job;
use App\Models\StudentCareerMatch;
use App\Models\User;
use Illuminate\Support\Collection;

/**
 * Career matching engine.
 *
 * Rumus (dokumentasi konsisten):
 * - Career match %  : round(100 * SUM(min(level_siswa, level_wajib)) / SUM(level_wajib))
 *                     dihitung atas seluruh skill wajib karier tersebut.
 * - Job match %     : round(100 * |skill_siswa ∩ skill_lowongan| / |skill_lowongan|)
 * - Skill gap status: mastered (level >= wajib), improving (selisih 1), needed (sisanya).
 */
class MatchingService
{
    public const GAP_MASTERED = 'mastered';
    public const GAP_IMPROVING = 'improving';
    public const GAP_NEEDED = 'needed';

    /**
     * Peta skill siswa: [skill_id => level].
     */
    public static function skillLevelsOf(User $student): array
    {
        return $student->studentSkills()
            ->pluck('level', 'skill_id')
            ->toArray();
    }

    /**
     * Semua karier dengan persentase kecocokan, terurut dari tertinggi.
     *
     * @param  array<int, int>|null  $levels  Snapshot level pasca-upsert; bila null dibaca dari DB.
     *
     * @return Collection<int, array{career: Career, percentage: int}>
     */
    public function matchesFor(User $student, ?array $levels = null): Collection
    {
        $levels ??= static::skillLevelsOf($student);

        return Career::with('skills')->get()
            ->map(function (Career $career) use ($levels) {
                return [
                    'career' => $career,
                    'percentage' => static::careerPercentage($career, $levels),
                ];
            })
            ->filter(fn (array $row) => $row['percentage'] > 0)
            ->sortByDesc('percentage')
            ->values();
    }

    public static function careerPercentage(Career $career, array $levels): int
    {
        $sumRequired = 0;
        $sumCovered = 0;

        foreach ($career->skills as $skill) {
            $required = (int) $skill->pivot->required_level;
            $sumRequired += $required;
            $sumCovered += min((int) ($levels[$skill->id] ?? 0), $required);
        }

        return $sumRequired === 0 ? 0 : (int) round($sumCovered * 100 / $sumRequired);
    }

    /**
     * Simpan hasil matching ke student_career_matches (sinkron penuh).
     *
     * @param  array<int, int>|null  $levels  Snapshot level pasca-upsert; bila null dibaca dari DB.
     */
    public function syncMatches(User $student, ?array $levels = null): Collection
    {
        $matches = $this->matchesFor($student, $levels);

        $keepIds = [];
        foreach ($matches as ['career' => $career, 'percentage' => $percentage]) {
            StudentCareerMatch::updateOrCreate(
                ['user_id' => $student->id, 'career_id' => $career->id],
                ['match_percentage' => $percentage]
            );
            $keepIds[] = $career->id;
        }

        if ($keepIds !== []) {
            StudentCareerMatch::where('user_id', $student->id)
                ->whereNotIn('career_id', $keepIds)
                ->delete();
        } else {
            StudentCareerMatch::where('user_id', $student->id)->delete();
        }

        return $matches;
    }

    /**
     * Skill gap siswa terhadap satu karier.
     */
    public function gapsFor(Career $career, array $levels): array
    {
        $gaps = [];

        foreach ($career->skills as $skill) {
            $required = (int) $skill->pivot->required_level;
            $current = (int) ($levels[$skill->id] ?? 0);

            if ($current >= $required) {
                continue;
            }

            $gaps[] = [
                'skillName' => $skill->name,
                'currentLevel' => $current,
                'requiredLevel' => $required,
                'status' => static::gapStatus($current, $required),
            ];
        }

        return $gaps;
    }

    public static function gapStatus(int $current, int $required): string
    {
        if ($current >= $required) {
            return static::GAP_MASTERED;
        }

        return ($required - $current) <= 1 ? static::GAP_IMPROVING : static::GAP_NEEDED;
    }

    /**
     * Persentase kecocokan lowongan untuk siswa.
     */
    public static function jobPercentage(Job $job, array $levels): int
    {
        $requiredIds = $job->skills->pluck('id');
        if ($requiredIds->isEmpty()) {
            return 0;
        }

        $owned = $requiredIds->filter(fn ($id) => isset($levels[$id]));

        return (int) round($owned->count() * 100 / $requiredIds->count());
    }
}
