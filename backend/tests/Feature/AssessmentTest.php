<?php

namespace Tests\Feature;

use App\Models\AppNotification;
use App\Models\Career;
use App\Models\RoadmapMilestone;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AssessmentTest extends TestCase
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

    public function test_valid_assessment_updates_skills_and_returns_matches(): void
    {
        $budi = User::where('email', 'budi@student.smk.id')->first();
        $node = Skill::where('name', 'Node.js')->first();
        $docker = Skill::where('name', 'Docker')->first();
        $rest = Skill::where('name', 'REST API')->first();
        $sql = Skill::where('name', 'SQL/Database')->first();
        $git = Skill::where('name', 'Git')->first();

        // Budi menguasai semua skill wajib Backend Developer hingga level 5
        $answers = [
            ['skillId' => $node->id, 'level' => 5],
            ['skillId' => $rest->id, 'level' => 5],
            ['skillId' => $sql->id, 'level' => 5],
            ['skillId' => $git->id, 'level' => 5],
            ['skillId' => $docker->id, 'level' => 1],
        ];

        $response = $this->withToken($this->tokenFor('budi@student.smk.id'))
            ->postJson("/api/students/{$budi->id}/assessment", $answers);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'careerMatches' => [['id', 'title', 'matchPercentage', 'requiredSkills']],
            ]);

        // Semua skill wajib karier teratas dikuasai penuh -> gap harus kosong
        $this->assertSame([], $response->json('skillGaps'));

        // DB assertions
        $this->assertDatabaseHas('student_skills', [
            'user_id' => $budi->id, 'skill_id' => $node->id, 'level' => 5,
        ]);
        $this->assertNotNull($budi->fresh()->assessed_at);

        // Backend Developer kini harus match sempurna (100)
        $backendMatch = Career::where('title', 'Backend Developer')->first();
        $this->assertDatabaseHas('student_career_matches', [
            'user_id' => $budi->id,
            'career_id' => $backendMatch->id,
            'match_percentage' => 100,
        ]);

        // CareerMatches terurut menurun
        $percentages = collect($response->json('careerMatches'))->pluck('matchPercentage');
        $this->assertSame($percentages->sortDesc()->values()->all(), $percentages->values()->all());

        // Notifikasi admin dibuat
        $this->assertDatabaseHas('notifications', [
            'target_role' => 'admin',
            'type' => 'assessment_done',
        ]);
    }

    public function test_assessment_generates_roadmap_from_top_career_gaps(): void
    {
        $fajar = User::where('email', 'fajar@student.smk.id')->first();
        $countBefore = RoadmapMilestone::where('user_id', $fajar->id)->count();

        $skills = Skill::whereIn('name', [
            'Windows Server', 'Linux Administration', 'Active Directory',
            'Networking', 'Cybersecurity Basics', 'Virtualization', 'Shell Scripting',
            'Hardware Troubleshooting', 'Database Management', 'Cloud Basics (AWS/Azure)',
        ])->get();

        $answers = $skills->map(fn ($s) => ['skillId' => $s->id, 'level' => 2])->all();

        $response = $this->withToken($this->tokenFor('fajar@student.smk.id'))
            ->postJson("/api/students/{$fajar->id}/assessment", $answers);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'skillGaps' => [['skillName', 'currentLevel', 'requiredLevel', 'status']],
            ]);

        $this->assertGreaterThan(0, count($response->json('skillGaps')));

        $generated = RoadmapMilestone::where('user_id', $fajar->id)
            ->where('title', 'like', 'Pelajari %')
            ->orderBy('sequence')
            ->get();

        $this->assertGreaterThan(0, $generated->count());
        $this->assertSame('available', $generated->first()->status);
        $this->assertCount($countBefore + $generated->count(), RoadmapMilestone::where('user_id', $fajar->id)->get());
    }

    /**
     * Reproduksi persis laporan bug manual Postman:
     * payload 5 skill (Node.js, REST API, SQL/Database, Git = level 5; Docker = 1)
     * harus menghasilkan Backend Developer 100% pada RESPONSE dan DB,
     * dengan skillGaps dihitung dari state terbaru (bukan state sebelum asesmen).
     */
    public function test_postman_regression_exact_payload_yields_100_for_backend_developer(): void
    {
        $budi = User::where('email', 'budi@student.smk.id')->first();
        $backendId = Career::where('title', 'Backend Developer')->value('id');

        // Pre-state seeder: nilai mock lama, membuktikan transisi terjadi
        $this->assertDatabaseHas('student_career_matches', [
            'user_id' => $budi->id,
            'career_id' => $backendId,
            'match_percentage' => 82,
        ]);

        $milestonesBefore = RoadmapMilestone::where('user_id', $budi->id)->count();
        $notifBefore = AppNotification::where('target_role', 'admin')->count();

        // Payload identik dengan manual testing Postman
        $payload = [
            ['skillId' => Skill::where('name', 'Node.js')->value('id'), 'level' => 5],
            ['skillId' => Skill::where('name', 'REST API')->value('id'), 'level' => 5],
            ['skillId' => Skill::where('name', 'SQL/Database')->value('id'), 'level' => 5],
            ['skillId' => Skill::where('name', 'Git')->value('id'), 'level' => 5],
            ['skillId' => Skill::where('name', 'Docker')->value('id'), 'level' => 1],
        ];

        $response = $this->withToken($this->tokenFor('budi@student.smk.id'))
            ->postJson("/api/students/{$budi->id}/assessment", $payload);

        $response->assertStatus(200);

        // RESPONSE harus dihitung dari level terbaru
        $matches = collect($response->json('careerMatches'));
        $this->assertSame(100, $matches->firstWhere('title', 'Backend Developer')['matchPercentage']);
        $this->assertSame(76, $matches->firstWhere('title', 'Fullstack Developer')['matchPercentage']);

        // Karier teratas dikuasai penuh -> tidak boleh ada gap level lama lagi
        $this->assertSame([], $response->json('skillGaps'));

        // student_skills benar-benar ter-update
        foreach (['Node.js', 'REST API', 'SQL/Database', 'Git'] as $name) {
            $this->assertDatabaseHas('student_skills', [
                'user_id' => $budi->id,
                'skill_id' => Skill::where('name', $name)->value('id'),
                'level' => 5,
            ]);
        }
        $this->assertDatabaseHas('student_skills', [
            'user_id' => $budi->id,
            'skill_id' => Skill::where('name', 'Docker')->value('id'),
            'level' => 1,
        ]);
        $this->assertNotNull($budi->fresh()->assessed_at);

        // Tidak ada gap karier teratas -> roadmap tidak bertambah
        $this->assertSame(
            $milestonesBefore,
            RoadmapMilestone::where('user_id', $budi->id)->count()
        );

        // Notifikasi admin bertambah tepat satu
        $this->assertSame($notifBefore + 1, AppNotification::where('target_role', 'admin')->count());
    }

    public function test_level_out_of_range_fails_validation(): void
    {
        $budi = User::where('email', 'budi@student.smk.id')->first();
        $skill = Skill::where('name', 'Git')->first();

        $this->withToken($this->tokenFor('budi@student.smk.id'))
            ->postJson("/api/students/{$budi->id}/assessment", [
                ['skillId' => $skill->id, 'level' => 6],
            ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['0.level']);
    }

    public function test_unknown_skill_fails_validation(): void
    {
        $budi = User::where('email', 'budi@student.smk.id')->first();

        $this->withToken($this->tokenFor('budi@student.smk.id'))
            ->postJson("/api/students/{$budi->id}/assessment", [
                ['skillId' => 99999, 'level' => 3],
            ])
            ->assertStatus(422);
    }

    public function test_student_cannot_submit_for_other_student(): void
    {
        $rinaId = User::where('email', 'rina@student.smk.id')->value('id');
        $skill = Skill::first();

        $this->withToken($this->tokenFor('budi@student.smk.id'))
            ->postJson("/api/students/{$rinaId}/assessment", [
                ['skillId' => $skill->id, 'level' => 3],
            ])
            ->assertStatus(403);
    }

    public function test_guest_gets_unauthenticated(): void
    {
        $budiId = User::where('email', 'budi@student.smk.id')->value('id');

        $this->postJson("/api/students/{$budiId}/assessment", [])
            ->assertStatus(401);
    }

    public function test_admin_notification_count_increases(): void
    {
        $before = AppNotification::where('target_role', 'admin')->count();

        $hendra = User::where('email', 'hendra@student.smk.id')->first();
        $skill = Skill::where('name', 'Cisco IOS')->first();

        $this->withToken($this->tokenFor('hendra@student.smk.id'))
            ->postJson("/api/students/{$hendra->id}/assessment", [
                ['skillId' => $skill->id, 'level' => 5],
            ])
            ->assertStatus(200);

        $this->assertSame($before + 1, AppNotification::where('target_role', 'admin')->count());
    }
}
