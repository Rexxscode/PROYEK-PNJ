<?php

namespace Tests\Feature;

use App\Models\Job;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class IndustryApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed();
    }

    protected function tokenFor(string $email): string
    {
        return User::where('email', $email)->first()->createToken('test')->plainTextToken;
    }

    public function test_industry_gets_candidates_with_scores_and_skills(): void
    {
        $response = $this->withToken($this->tokenFor('industry@hrd.com'))
            ->getJson('/api/industry/candidates');

        $response->assertStatus(200)->assertJsonStructure([
            'candidates' => [['id', 'name', 'major', 'grade', 'score', 'topCareer', 'skills', 'slug']],
            'skills',
        ]);

        $json = $response->json();
        $this->assertCount(4, $json['candidates']);

        // Terurut score menurun; Fajar (avg 85,78,75 = 79) harus teratas
        $scores = collect($json['candidates'])->pluck('score');
        $this->assertSame($scores->sortDesc()->values()->all(), $scores->values()->all());
        $this->assertSame(79, $scores->first());
        $this->assertSame('IT Support Specialist', collect($json['candidates'])->first()['topCareer']);

        // Budi: avg (82+75+70+52)/4 = 70, top karier Backend Developer
        $budi = collect($json['candidates'])->firstWhere('name', 'Budi Santoso');
        $this->assertSame(70, $budi['score']);
        $this->assertSame('Backend Developer', $budi['topCareer']);
        $this->assertContains('Node.js', $budi['skills']);
        $this->assertSame('budi-santoso', $budi['slug']);

        // Tidak ada data sensitif
        $this->assertStringNotContainsString('password', $response->getContent());

        // Daftar skill unik untuk filter chips
        $this->assertContains('Node.js', $json['skills']);
        $this->assertCount(collect($json['candidates'])->pluck('skills')->flatten()->unique()->count(), $json['skills']);
    }

    public function test_industry_stats_match_documented_formulas(): void
    {
        $response = $this->withToken($this->tokenFor('industry@hrd.com'))
            ->getJson('/api/industry/stats');

        $response->assertStatus(200);

        // Semua deadline seed sudah lewat -> activeJobs = 0
        // avgMatch = mean dari per-student avg: Budi 70, Rina 77, Hendra 75, Fajar 79 -> 75
        $response->assertJson([
            'totalCandidates' => 4,
            'matched' => 4,
            'activeJobs' => 0,
            'avgMatch' => 75,
        ]);
    }

    public function test_active_jobs_counts_future_or_null_deadlines(): void
    {
        $industryId = User::where('email', 'industry@hrd.com')->value('id');

        Job::create([
            'posted_by' => $industryId, 'company' => 'PT Future', 'title' => 'Future Job',
            'type' => 'magang', 'location' => 'Remote', 'description' => '-',
            'deadline' => now()->addMonth(),
        ]);
        Job::create([
            'posted_by' => $industryId, 'company' => 'PT NoDeadline', 'title' => 'Open Job',
            'type' => 'fulltime', 'location' => 'Remote', 'description' => '-',
        ]);
        Job::create([
            'posted_by' => $industryId, 'company' => 'PT Past', 'title' => 'Expired Job',
            'type' => 'magang', 'location' => 'Remote', 'description' => '-',
            'deadline' => now()->subDay(),
        ]);

        $this->withToken($this->tokenFor('industry@hrd.com'))
            ->getJson('/api/industry/stats')
            ->assertStatus(200)
            ->assertJsonPath('activeJobs', 2);
    }

    public function test_student_cannot_access_industry_endpoints(): void
    {
        $token = $this->tokenFor('budi@student.smk.id');

        $this->withToken($token)->getJson('/api/industry/candidates')->assertStatus(403);
        $this->withToken($token)->getJson('/api/industry/stats')->assertStatus(403);
    }

    public function test_guest_gets_unauthenticated(): void
    {
        $this->getJson('/api/industry/candidates')->assertStatus(401);
        $this->getJson('/api/industry/stats')->assertStatus(401);
    }
}
