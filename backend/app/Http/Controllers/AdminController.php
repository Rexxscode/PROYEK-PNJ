<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserProfileResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class AdminController extends Controller
{
    /**
     * GET /api/admin/stats
     *
     * Definisi formula:
     * - avgReadinessScore : rata-rata dari rata-rata match tiap siswa yang dinilai.
     * - topCareers        : 5 karier paling banyak dipilih (jumlah match), urut menurun.
     * - readinessByMajor  : rata-rata readiness per jurusan.
     */
    public function stats(): JsonResponse
    {
        $students = User::query()
            ->where('role', 'student')
            ->with('studentCareerMatches.career')
            ->get();

        $assessed = $students->filter(fn (User $s) => $s->studentCareerMatches->isNotEmpty());

        $topCareers = $assessed
            ->flatMap(fn (User $s) => $s->studentCareerMatches)
            ->groupBy(fn ($m) => $m->career?->title ?? '-')
            ->map(fn ($group, $title) => ['name' => $title, 'count' => $group->count()])
            ->sortByDesc('count')
            ->take(5)
            ->values()
            ->all();

        $readinessByMajor = $assessed
            ->groupBy(fn (User $s) => $s->major ?? '-')
            ->map(function ($group, $major) {
                return [
                    'major' => $major,
                    'score' => (int) round((float) $group->avg(
                        fn (User $s) => (float) $s->studentCareerMatches->avg('match_percentage')
                    )),
                ];
            })
            ->sortByDesc('score')
            ->values()
            ->all();

        return response()->json([
            'totalStudents' => $students->count(),
            'assessedStudents' => $assessed->count(),
            'avgReadinessScore' => (int) round((float) $assessed->avg(
                fn (User $s) => (float) $s->studentCareerMatches->avg('match_percentage')
            )),
            'topCareers' => $topCareers,
            'readinessByMajor' => $readinessByMajor,
        ]);
    }

    /**
     * GET /api/admin/students — daftar siswa + ringkasan readiness.
     */
    public function students(): JsonResponse
    {
        $students = User::query()
            ->where('role', 'student')
            ->with(['studentCareerMatches.career'])
            ->orderBy('name')
            ->get();

        return response()->json($students->map(function (User $student) {
            $matches = $student->studentCareerMatches->sortByDesc('match_percentage');
            $hasAssessment = $student->studentCareerMatches->isNotEmpty();

            return array_merge(
                (new UserProfileResource($student))->resolve(),
                [
                    'score' => (int) round((float) $student->studentCareerMatches->avg('match_percentage')),
                    'status' => $hasAssessment ? 'assessed' : 'pending',
                    'topCareer' => $hasAssessment ? $matches->first()?->career?->title : null,
                ]
            );
        })->all());
    }
}
