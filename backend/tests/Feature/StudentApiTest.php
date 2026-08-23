<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StudentApiTest extends TestCase
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

    public function test_admin_lists_all_students(): void
    {
        $response = $this->withToken($this->tokenFor('admin@smk.id'))
            ->getJson('/api/students');

        $response->assertStatus(200)
            ->assertJsonCount(4)
            ->assertJsonStructure([['id', 'name', 'email', 'role', 'major', 'grade', 'avatar', 'createdAt']]);
    }

    public function test_student_cannot_list_students(): void
    {
        $this->withToken($this->tokenFor('budi@student.smk.id'))
            ->getJson('/api/students')
            ->assertStatus(403);
    }

    public function test_student_can_view_own_full_data(): void
    {
        $budi = User::where('email', 'budi@student.smk.id')->first();

        $response = $this->withToken($this->tokenFor('budi@student.smk.id'))
            ->getJson("/api/students/{$budi->id}");

        $response->assertStatus(200)->assertJsonStructure([
            'profile',
            'hardSkills' => [['id', 'name', 'category', 'level']],
            'softSkills',
            'careerMatches' => [['title', 'matchPercentage', 'requiredSkills']],
            'skillGaps',
            'roadmapMilestones' => [['title', 'status', 'estimatedHours', 'resources']],
            'projects',
            'jobOpportunities' => [['company', 'title', 'matchPercentage']],
        ]);

        $json = $response->json();
        $this->assertCount(10, $json['hardSkills']);
        $this->assertCount(6, $json['softSkills']);
        $this->assertCount(4, $json['careerMatches']);
        $this->assertCount(5, $json['roadmapMilestones']);
        $this->assertCount(3, $json['projects']);
        $this->assertGreaterThan(0, count($json['jobOpportunities']));

        $matches = collect($json['careerMatches']);
        $this->assertSame('Backend Developer', $matches->first()['title']);
        $this->assertSame(82, $matches->first()['matchPercentage']);
    }

    public function test_student_cannot_view_other_student(): void
    {
        $budiId = User::where('email', 'budi@student.smk.id')->value('id');

        $this->withToken($this->tokenFor('rina@student.smk.id'))
            ->getJson("/api/students/{$budiId}")
            ->assertStatus(403);
    }

    public function test_industry_cannot_view_private_student_data(): void
    {
        $budiId = User::where('email', 'budi@student.smk.id')->value('id');

        $this->withToken($this->tokenFor('industry@hrd.com'))
            ->getJson("/api/students/{$budiId}")
            ->assertStatus(403);
    }

    public function test_admin_can_view_any_student(): void
    {
        $rinaId = User::where('email', 'rina@student.smk.id')->value('id');

        $this->withToken($this->tokenFor('admin@smk.id'))
            ->getJson("/api/students/{$rinaId}")
            ->assertStatus(200)
            ->assertJsonPath('profile.name', 'Rina Wulandari');
    }

    public function test_guest_gets_unauthenticated(): void
    {
        $budiId = User::where('email', 'budi@student.smk.id')->value('id');

        $this->getJson("/api/students/{$budiId}")->assertStatus(401);
    }

    public function test_student_updates_own_profile(): void
    {
        $budi = User::where('email', 'budi@student.smk.id')->first();

        $response = $this->withToken($this->tokenFor('budi@student.smk.id'))
            ->putJson("/api/students/{$budi->id}", ['name' => 'Budi Santoso Jr.']);

        $response->assertStatus(200)
            ->assertJsonPath('name', 'Budi Santoso Jr.')
            ->assertJsonMissing(['password']);

        // Slug ikut berubah dan tetap unik
        $this->assertDatabaseHas('users', ['id' => $budi->id, 'slug' => 'budi-santoso-jr']);
    }

    public function test_student_cannot_update_other_profile(): void
    {
        $rinaId = User::where('email', 'rina@student.smk.id')->value('id');

        $this->withToken($this->tokenFor('budi@student.smk.id'))
            ->putJson("/api/students/{$rinaId}", ['name' => 'Dirubah'])
            ->assertStatus(403);
    }

    public function test_portfolio_returns_expected_shape(): void
    {
        $budi = User::where('email', 'budi@student.smk.id')->first();

        $response = $this->withToken($this->tokenFor('budi@student.smk.id'))
            ->getJson("/api/students/{$budi->id}/portfolio");

        $response->assertStatus(200)->assertJsonStructure([
            'user',
            'skills',
            'readinessScore',
            'projects',
            'careerMatches',
            'publicUrl',
        ]);

        $json = $response->json();
        $this->assertCount(16, $json['skills']);
        $this->assertSame((int) round(collect([82, 75, 70, 52])->avg()), $json['readinessScore']);
        $this->assertCount(3, $json['careerMatches']);
    }
}
