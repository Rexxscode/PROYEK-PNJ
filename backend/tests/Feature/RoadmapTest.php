<?php

namespace Tests\Feature;

use App\Models\RoadmapMilestone;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RoadmapTest extends TestCase
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

    public function test_student_gets_own_roadmap(): void
    {
        $budi = User::where('email', 'budi@student.smk.id')->first();

        $response = $this->withToken($this->tokenFor('budi@student.smk.id'))
            ->getJson("/api/students/{$budi->id}/roadmap");

        $response->assertStatus(200)
            ->assertJsonStructure([['id', 'title', 'status', 'estimatedHours', 'skills', 'resources']]);

        $this->assertCount(5, $response->json());

        // Terurut berdasarkan sequence: milestone pertama = "Pahami REST API"
        $this->assertSame('Pahami REST API', $response->json('0.title'));
        $this->assertSame('completed', $response->json('0.status'));
    }

    public function test_guest_gets_unauthenticated(): void
    {
        $budiId = User::where('email', 'budi@student.smk.id')->value('id');

        $this->getJson("/api/students/{$budiId}/roadmap")->assertStatus(401);
    }

    public function test_student_cannot_view_other_roadmap(): void
    {
        $hendraId = User::where('email', 'hendra@student.smk.id')->value('id');

        $this->withToken($this->tokenFor('fajar@student.smk.id'))
            ->getJson("/api/students/{$hendraId}/roadmap")
            ->assertStatus(403);
    }

    public function test_update_milestone_status_valid(): void
    {
        $budi = User::where('email', 'budi@student.smk.id')->first();
        $milestone = RoadmapMilestone::where('user_id', $budi->id)->where('status', 'available')->firstOrFail();

        $response = $this->withToken($this->tokenFor('budi@student.smk.id'))
            ->putJson("/api/students/{$budi->id}/roadmap/{$milestone->id}", [
                'status' => 'in_progress',
            ]);

        $response->assertStatus(200)
            ->assertJsonPath('status', 'in_progress')
            ->assertJsonPath('id', 'rm-'.$milestone->id);

        $this->assertDatabaseHas('roadmap_milestones', [
            'id' => $milestone->id, 'status' => 'in_progress',
        ]);
    }

    public function test_update_milestone_status_invalid_fails(): void
    {
        $budi = User::where('email', 'budi@student.smk.id')->first();
        $milestone = RoadmapMilestone::where('user_id', $budi->id)->first();

        $this->withToken($this->tokenFor('budi@student.smk.id'))
            ->putJson("/api/students/{$budi->id}/roadmap/{$milestone->id}", [
                'status' => 'selesai',
            ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['status']);
    }

    public function test_cannot_update_milestone_of_other_user_even_with_valid_status(): void
    {
        // Rina mencoba mengubah milik Budi via endpoint dirinya sendiri
        $rina = User::where('email', 'rina@student.smk.id')->first();
        $foreignMilestone = RoadmapMilestone::where('user_id', '!=', $rina->id)->first();

        $this->withToken($this->tokenFor('rina@student.smk.id'))
            ->putJson("/api/students/{$rina->id}/roadmap/{$foreignMilestone->id}", [
                'status' => 'completed',
            ])
            ->assertStatus(404);

        // Dan juga lewat endpoint milik Budi
        $budi = User::where('email', 'budi@student.smk.id')->first();
        $budiMilestone = RoadmapMilestone::where('user_id', $budi->id)->first();

        $this->withToken($this->tokenFor('rina@student.smk.id'))
            ->putJson("/api/students/{$budi->id}/roadmap/{$budiMilestone->id}", [
                'status' => 'completed',
            ])
            ->assertStatus(403);
    }
}
