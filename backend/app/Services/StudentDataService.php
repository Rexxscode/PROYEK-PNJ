<?php

namespace App\Services;

use App\Models\Job;
use App\Models\StudentCareerMatch;
use App\Models\User;
use Illuminate\Support\Collection;

/**
 * Menyusun payload sesuai kontrak frontend:
 * StudentData (GET /api/students/{id}) dan Portfolio.
 */
class StudentDataService
{
    public function __construct(private readonly MatchingService $matching)
    {
    }

    /**
     * @return array{hardSkills: list<array>, softSkills: list<array>}
     */
    public function skillsOf(User $student): array
    {
        $skills = $student->skills()->orderBy('skills.id')->get();

        $map = fn (Collection $items) => $items->map(fn ($s) => [
            'id' => (string) $s->id,
            'name' => $s->name,
            'category' => $s->category,
            'level' => (int) $s->pivot->level,
        ])->values()->all();

        return [
            'hardSkills' => $map($skills->where('category', 'hard')),
            'softSkills' => $map($skills->where('category', 'soft')),
        ];
    }

    /**
     * Career matches tersimpan (hasil assessment) terurut persentase tertinggi.
     */
    public function careerMatchesOf(User $student): array
    {
        return StudentCareerMatch::query()
            ->where('user_id', $student->id)
            ->with('career.skills')
            ->orderByDesc('match_percentage')
            ->get()
            ->map(function (StudentCareerMatch $match) {
                return [
                    'id' => 'cm-'.$match->career_id,
                    'title' => $match->career->title,
                    'description' => $match->career->description ?? '',
                    'matchPercentage' => (int) $match->match_percentage,
                    'requiredSkills' => $match->career->skills->map(fn ($s) => [
                        'id' => (string) $s->id,
                        'name' => $s->name,
                        'category' => $s->category,
                        'level' => (int) $s->pivot->required_level,
                    ])->values(),
                    'category' => $match->career->category ?? '',
                ];
            })
            ->values()
            ->all();
    }

    /**
     * Skill gap untuk karier dengan match tertinggi; kosong bila belum ada match.
     */
    public function skillGapsForTopMatch(User $student, ?array $levels = null): array
    {
        $levels ??= MatchingService::skillLevelsOf($student);

        $top = StudentCareerMatch::query()
            ->where('user_id', $student->id)
            ->with('career.skills')
            ->orderByDesc('match_percentage')
            ->first();

        if (! $top?->career) {
            return [];
        }

        return $this->matching->gapsFor($top->career, $levels);
    }

    public function roadmapOf(User $student): array
    {
        return $student->roadmapMilestones()
            ->orderBy('sequence')
            ->orderBy('id')
            ->get()
            ->map(fn ($m) => [
                'id' => 'rm-'.$m->id,
                'title' => $m->title,
                'description' => $m->description ?? '',
                'status' => $m->status,
                'skills' => $m->skills ?? [],
                'estimatedHours' => (int) $m->estimated_hours,
                'resources' => collect($m->resources ?? [])->map(fn ($r) => [
                    'title' => $r['title'] ?? '',
                    'url' => $r['url'] ?? '',
                    'type' => $r['type'] ?? 'article',
                ])->values()->all(),
            ])
            ->values()
            ->all();
    }

    public function projectsOf(User $student): array
    {
        return $student->projects()
            ->orderByDesc('completed_at')
            ->get()
            ->map(fn ($p) => [
                'id' => 'pj-'.$p->id,
                'title' => $p->title,
                'description' => $p->description ?? '',
                'skills' => $p->skills ?? [],
                'imageUrl' => $p->image_url,
                'projectUrl' => $p->project_url,
                'completedAt' => $p->completed_at?->toDateString(),
            ])
            ->values()
            ->all();
    }

    /**
     * Lowongan terurut dari paling cocok untuk siswa ini.
     */
    public function matchedJobsFor(User $student): array
    {
        $levels = MatchingService::skillLevelsOf($student);

        return Job::with('skills')
            ->get()
            ->map(function (Job $job) use ($levels) {
                return ['job' => $job, 'percentage' => MatchingService::jobPercentage($job, $levels)];
            })
            ->filter(fn (array $row) => $row['percentage'] > 0)
            ->sortByDesc('percentage')
            ->take(12)
            ->map(fn (array $row) => $this->formatJob($row['job'], $row['percentage']))
            ->values()
            ->all();
    }

    public function formatJob(Job $job, int $percentage): array
    {
        return [
            'id' => 'job-'.$job->id,
            'company' => $job->company,
            'companyLogo' => $job->company_logo ?? '',
            'title' => $job->title,
            'type' => $job->type,
            'location' => $job->location,
            'description' => $job->description,
            'requiredSkills' => $job->skills->pluck('name')->values()->all(),
            'matchPercentage' => $percentage,
            'postedAt' => $job->posted_at?->toDateString(),
            'deadline' => $job->deadline?->toDateString(),
        ];
    }

    /**
     * Payload lengkap GET /api/students/{id}.
     */
    public function studentData(User $student): array
    {
        $skills = $this->skillsOf($student);

        return [
            'profile' => (new \App\Http\Resources\UserProfileResource($student))->resolve(),
            'hardSkills' => $skills['hardSkills'],
            'softSkills' => $skills['softSkills'],
            'careerMatches' => $this->careerMatchesOf($student),
            'skillGaps' => $this->skillGapsForTopMatch($student),
            'roadmapMilestones' => $this->roadmapOf($student),
            'projects' => $this->projectsOf($student),
            'jobOpportunities' => $this->matchedJobsFor($student),
        ];
    }

    /**
     * Rata-rata persentase career match sebagai readiness score.
     */
    public function readinessScore(User $student): int
    {
        $avg = StudentCareerMatch::where('user_id', $student->id)->avg('match_percentage');

        return (int) round((float) $avg);
    }

    /**
     * Payload GET /api/students/{id}/portfolio dan /api/portfolio/{slug}.
     */
    public function portfolio(User $student, bool $public = false): array
    {
        $skills = $this->skillsOf($student);

        return [
            'user' => $public
                ? [
                    'id' => $student->id,
                    'name' => $student->name,
                    'major' => $student->major,
                    'grade' => $student->grade,
                    'avatar' => $student->avatar ?? '',
                ]
                : (new \App\Http\Resources\UserProfileResource($student))->resolve(),
            'skills' => array_values(array_merge($skills['hardSkills'], $skills['softSkills'])),
            'readinessScore' => $this->readinessScore($student),
            'projects' => $this->projectsOf($student),
            'careerMatches' => array_slice($this->careerMatchesOf($student), 0, 3),
            'publicUrl' => url('/portfolio/'.$student->slug),
        ];
    }
}
