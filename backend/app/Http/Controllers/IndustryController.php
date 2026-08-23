<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class IndustryController extends Controller
{
    /**
     * GET /api/industry/candidates
     *
     * Definisi:
     * - score      : rata-rata persentase career match siswa (0 bila belum asesmen).
     * - topCareer  : karier dengan persentase tertinggi.
     * - skills     : daftar nama skill yang dinilai siswa.
     * Terurut dari score tertinggi.
     */
    public function candidates(): JsonResponse
    {
        $candidates = User::query()
            ->where('role', 'student')
            ->with(['studentCareerMatches.career', 'skills'])
            ->orderBy('name')
            ->get()
            ->map(function (User $student) {
                $matches = $student->studentCareerMatches->sortByDesc('match_percentage');

                return [
                    'id' => $student->id,
                    'name' => $student->name,
                    'major' => $student->major,
                    'grade' => $student->grade,
                    'score' => (int) round((float) $student->studentCareerMatches->avg('match_percentage')),
                    'topCareer' => $matches->first()?->career?->title,
                    'skills' => $student->skills->pluck('name')->sort()->values()->all(),
                    'portfolioUrl' => url('/portfolio/'.$student->slug),
                ];
            })
            ->sortByDesc('score')
            ->values();

        $skills = collect($candidates)
            ->pluck('skills')
            ->flatten()
            ->unique()
            ->sort()
            ->values();

        return response()->json([
            'candidates' => $candidates->all(),
            'skills' => $skills->all(),
        ]);
    }

    /**
     * GET /api/industry/stats
     *
     * Definisi formula:
     * - totalCandidates : jumlah user role student.
     * - matched         : jumlah siswa dengan match tertinggi >= 70%.
     * - activeJobs      : lowongan tanpa deadline atau deadline >= hari ini.
     * - avgMatch        : rata-rata dari rata-rata match tiap siswa yang sudah asesmen.
     */
    public function stats(): JsonResponse
    {
        $students = User::query()
            ->where('role', 'student')
            ->with('studentCareerMatches')
            ->get();

        $assessed = $students->filter(fn (User $s) => $s->studentCareerMatches->isNotEmpty());

        return response()->json([
            'totalCandidates' => $students->count(),
            'matched' => $students->filter(
                fn (User $s) => ($s->studentCareerMatches->max('match_percentage') ?? 0) >= 70
            )->count(),
            'activeJobs' => Job::query()
                ->where(fn ($q) => $q->whereNull('deadline')->orWhere('deadline', '>=', today()))
                ->count(),
            'avgMatch' => (int) round((float) $assessed->avg(
                fn (User $s) => (float) $s->studentCareerMatches->avg('match_percentage')
            )),
        ]);
    }
}
