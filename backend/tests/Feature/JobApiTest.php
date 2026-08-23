<?php

namespace Tests\Feature;

use App\Models\AppNotification;
use App\Models\Job;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class JobApiTest extends TestCase
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

    protected function jobPayload(array $overrides = []): array
    {
        return array_merge([
            'title' => 'QA Engineer Intern',
            'company' => 'PT Quality First',
            'location' => 'Jakarta (Hybrid)',
            'type' => 'magang',
            'description' => 'Magang quality assurance aplikasi web.',
            'requiredSkills' => ['Node.js', 'Git'],
            'deadline' => '2026-06-30',
            'salary' => 'Rp 1-2 juta/bulan',
        ], $overrides);
    }

    public function test_industry_creates_job_with_skills_and_notification(): void
    {
        $notifBefore = AppNotification::where('target_role', 'student')->count();

        $response = $this->withToken($this->tokenFor('industry@hrd.com'))
            ->postJson('/api/jobs', $this->jobPayload());

        $response->assertStatus(201)
            ->assertJsonPath('title', 'QA Engineer Intern')
            ->assertJsonPath('company', 'PT Quality First')
            ->assertJsonPath('salary', 'Rp 1-2 juta/bulan')
            ->assertJsonStructure(['id', 'company', 'title', 'type', 'requiredSkills', 'postedAt', 'deadline']);

        $job = Job::where('title', 'QA Engineer Intern')->firstOrFail();
        $this->assertSame('magang', $job->type);
        $this->assertEquals(User::where('email', 'industry@hrd.com')->value('id'), $job->posted_by);
        $this->assertSame(['Git', 'Node.js'], $job->skills->pluck('name')->sort()->values()->all());
        $this->assertSame($notifBefore + 1, AppNotification::where('target_role', 'student')->count());
    }

    public function test_custom_skill_is_auto_created_in_master(): void
    {
        $this->withToken($this->tokenFor('industry@hrd.com'))
            ->postJson('/api/jobs', $this->jobPayload(['requiredSkills' => ['Prompt Engineering']]))
            ->assertStatus(201);

        $this->assertDatabaseHas('skills', ['name' => 'Prompt Engineering', 'category' => 'hard']);
    }

    public function test_student_cannot_create_job(): void
    {
        $this->withToken($this->tokenFor('budi@student.smk.id'))
            ->postJson('/api/jobs', $this->jobPayload())
            ->assertStatus(403);
    }

    public function test_owner_updates_job(): void
    {
        $job = Job::where('title', 'Backend Developer Intern')->firstOrFail();

        $response = $this->withToken($this->tokenFor('industry@hrd.com'))
            ->putJson("/api/jobs/{$job->id}", [
                'title' => 'Backend Developer Intern II',
                'requiredSkills' => ['Node.js', 'REST API', 'SQL/Database', 'Docker'],
            ]);

        $response->assertStatus(200)
            ->assertJsonPath('title', 'Backend Developer Intern II')
            ->assertJsonCount(4, 'requiredSkills');

        // posted_by tidak boleh berubah meski dikirim
        $originalOwner = $job->posted_by;
        $this->withToken($this->tokenFor('industry@hrd.com'))
            ->putJson("/api/jobs/{$job->id}", ['company' => 'PT Coba Alih'])
            ->assertStatus(200);

        $this->assertSame($originalOwner, $job->fresh()->posted_by);
    }

    public function test_non_owner_cannot_update_job(): void
    {
        $job = Job::firstOrFail();
        $secondIndustry = User::create([
            'name' => 'HRD Lain', 'email' => 'hrd-lain@corp.com', 'password' => 'password123',
            'role' => 'industry', 'major' => 'HRD', 'grade' => '-',
        ]);

        $this->withToken($secondIndustry->createToken('t')->plainTextToken)
            ->putJson("/api/jobs/{$job->id}", ['title' => 'Direbut'])
            ->assertStatus(403);
    }

    public function test_owner_deletes_job(): void
    {
        $job = Job::where('title', 'UI/UX Design Freelance')->firstOrFail();
        $skillIds = $job->skills()->pluck('skills.id')->all();

        $this->withToken($this->tokenFor('industry@hrd.com'))
            ->deleteJson("/api/jobs/{$job->id}")
            ->assertStatus(200)
            ->assertJsonPath('success', true);

        $this->assertDatabaseMissing('job_opportunities', ['id' => $job->id]);
        $this->assertDatabaseMissing('job_skill', ['job_id' => $job->id]);
        foreach ($skillIds as $id) {
            $this->assertDatabaseHas('skills', ['id' => $id]);
        }
    }

    public function test_student_sees_jobs_sorted_by_personal_match(): void
    {
        $response = $this->withToken($this->tokenFor('budi@student.smk.id'))
            ->getJson('/api/jobs');

        $response->assertStatus(200)
            ->assertJsonStructure([['id', 'company', 'title', 'matchPercentage', 'requiredSkills']]);

        $percentages = collect($response->json())->pluck('matchPercentage');
        $this->assertGreaterThan(0, count($percentages));
        $sorted = $percentages->sortDesc()->values();
        $this->assertSame($sorted->all(), $percentages->values()->all());
        $this->assertSame(100, $percentages->first()); // Backend Developer Intern: semua 3 skill dikuasai level>=? overlap penuh
    }

    public function test_guest_gets_all_jobs_without_match_filtering(): void
    {
        $response = $this->getJson('/api/jobs');

        $response->assertStatus(200);

        $json = collect($response->json());
        $this->assertCount(Job::count(), $json);
        $this->assertSame(0, $json->pluck('matchPercentage')->unique()->first() ?? 0);
    }

    public function test_validation_fails_for_invalid_type(): void
    {
        $this->withToken($this->tokenFor('industry@hrd.com'))
            ->postJson('/api/jobs', $this->jobPayload(['type' => 'kontrak']))
            ->assertStatus(422)
            ->assertJsonValidationErrors(['type']);
    }
}
