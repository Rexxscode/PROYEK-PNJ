<?php

namespace Tests\Feature;

use App\Models\AppNotification;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NotificationApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed();
        // Seeder membuat 3 notifikasi:
        // - assessment_done -> admin (broadcast)
        // - job_posted -> student (broadcast)
        // - job_posted -> student, target_email budi (personal)
    }

    /**
     * actingAs(sanctum) dipakai alih-alih withToken agar aman saat satu test
     * perlu berpindah-pindah user (guard sanctum mem-memoize user per app instance).
     */
    protected function asUser(string $email): self
    {
        return $this->actingAs(User::where('email', $email)->first(), 'sanctum');
    }

    public function test_student_sees_broadcast_and_personal_only(): void
    {
        $response = $this->asUser('budi@student.smk.id')
            ->getJson('/api/notifications');

        $response->assertStatus(200)
            ->assertJsonStructure([['id', 'text', 'time', 'read', 'createdAt', 'type', 'targetRole']]);

        $this->assertCount(2, $response->json());

        // Rina hanya melihat broadcast student
        $this->asUser('rina@student.smk.id')
            ->getJson('/api/notifications')
            ->assertStatus(200)
            ->assertJsonCount(1);

        // Admin hanya broadcast admin
        $this->asUser('admin@smk.id')
            ->getJson('/api/notifications')
            ->assertStatus(200)
            ->assertJsonCount(1)
            ->assertJsonPath('0.type', 'assessment_done');
    }

    public function test_bearer_token_flow_returns_current_user_notifications(): void
    {
        $token = User::where('email', 'budi@student.smk.id')->first()->createToken('test')->plainTextToken;

        $this->withToken($token)
            ->getJson('/api/notifications')
            ->assertStatus(200)
            ->assertJsonCount(2);
    }

    public function test_mark_as_read_is_idempotent_and_scoped(): void
    {
        $budiNotif = AppNotification::where('target_role', 'student')->first();

        $this->asUser('budi@student.smk.id')
            ->putJson("/api/notifications/{$budiNotif->id}/read")
            ->assertStatus(200)
            ->assertJsonPath('success', true);

        // Idempotent: panggil lagi tetap sukses
        $this->asUser('budi@student.smk.id')
            ->putJson("/api/notifications/{$budiNotif->id}/read")
            ->assertStatus(200);

        $this->assertNotNull($budiNotif->fresh()->read_at);

        // Notif milik role lain tidak bisa dibaca oleh user ini
        $adminNotif = AppNotification::where('target_role', 'admin')->first();
        $this->asUser('budi@student.smk.id')
            ->putJson("/api/notifications/{$adminNotif->id}/read")
            ->assertStatus(404);
    }

    public function test_mark_all_as_read_only_for_own_scope(): void
    {
        $this->asUser('budi@student.smk.id')
            ->putJson('/api/notifications/read-all')
            ->assertStatus(200)
            ->assertJsonPath('success', true);

        // Semua notifikasi student terbaca
        $unreadStudent = AppNotification::where('target_role', 'student')->whereNull('read_at')->count();
        $this->assertSame(0, $unreadStudent);

        // Admin tidak terpengaruh
        $unreadAdmin = AppNotification::where('target_role', 'admin')->whereNull('read_at')->count();
        $this->assertSame(1, $unreadAdmin);
    }

    public function test_admin_creates_notification(): void
    {
        $response = $this->asUser('admin@smk.id')
            ->postJson('/api/notifications', [
                'text' => 'Rapat BK hari Jumat',
                'type' => 'announcement',
                'targetRole' => 'student',
                'targetEmail' => 'rina@student.smk.id',
            ]);

        $response->assertStatus(201)->assertJsonPath('success', true);

        $this->assertDatabaseHas('notifications', [
            'text' => 'Rapat BK hari Jumat',
            'type' => 'announcement',
            'target_role' => 'student',
            'target_email' => 'rina@student.smk.id',
        ]);

        // Rina menerima karena targetEmail cocok
        $this->asUser('rina@student.smk.id')
            ->getJson('/api/notifications')
            ->assertJsonCount(2);
    }

    public function test_student_cannot_create_notification(): void
    {
        $this->asUser('budi@student.smk.id')
            ->postJson('/api/notifications', [
                'text' => 'Spam', 'type' => 'announcement', 'targetRole' => 'student',
            ])
            ->assertStatus(403);
    }

    public function test_create_validation_fails_on_invalid_target_role(): void
    {
        $this->asUser('admin@smk.id')
            ->postJson('/api/notifications', [
                'text' => 'Tes', 'type' => 'announcement', 'targetRole' => 'semua',
            ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['targetRole']);
    }
}
