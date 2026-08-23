<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed();
    }

    public function test_register_success_returns_token_and_student_user(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Siti Nurhaliza',
            'email' => 'siti@student.smk.id',
            'password' => 'password123',
            'major' => 'rpl',
            'grade' => 'xi',
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure(['token', 'user' => ['id', 'name', 'email', 'role', 'major', 'grade', 'avatar', 'createdAt']])
            ->assertJsonPath('user.role', 'student')
            ->assertJsonPath('user.name', 'Siti Nurhaliza')
            ->assertJsonPath('user.major', 'Rekayasa Perangkat Lunak')
            ->assertJsonPath('user.grade', 'XI');

        $this->assertDatabaseHas('users', [
            'email' => 'siti@student.smk.id',
            'role' => 'student',
            'slug' => 'siti-nurhaliza',
        ]);
    }

    public function test_register_duplicate_email_fails(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Duplikat',
            'email' => 'budi@student.smk.id',
            'password' => 'password123',
            'major' => 'tkj',
            'grade' => 'xii',
        ]);

        $response->assertStatus(422)->assertJsonValidationErrors(['email']);
    }

    public function test_register_invalid_major_or_grade_fails(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Aneh',
            'email' => 'aneh@student.smk.id',
            'password' => 'password123',
            'major' => 'kedokteran',
            'grade' => 'xii',
        ]);

        $response->assertStatus(422)->assertJsonValidationErrors(['major']);
    }

    public function test_login_success_returns_token_and_user(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'email' => 'budi@student.smk.id',
            'password' => 'Budi@2026!',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure(['token', 'user' => ['id', 'name', 'email', 'role']])
            ->assertJsonPath('user.email', 'budi@student.smk.id');
    }

    public function test_login_admin_and_industry_roles_returned(): void
    {
        $this->postJson('/api/auth/login', ['email' => 'admin@smk.id', 'password' => 'Admin@2026!'])
            ->assertStatus(200)
            ->assertJsonPath('user.role', 'admin');

        $this->postJson('/api/auth/login', ['email' => 'industry@hrd.com', 'password' => 'Industry@2026!'])
            ->assertStatus(200)
            ->assertJsonPath('user.role', 'industry');
    }

    public function test_login_wrong_password_is_unauthorized(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'email' => 'budi@student.smk.id',
            'password' => 'password-salah',
        ]);

        $response->assertStatus(401)->assertJsonPath('message', 'Email atau password salah');
    }

    public function test_me_requires_token(): void
    {
        $this->getJson('/api/auth/me')->assertStatus(401);
    }

    public function test_me_with_token_returns_current_user_without_password(): void
    {
        $login = $this->postJson('/api/auth/login', [
            'email' => 'rina@student.smk.id',
            'password' => 'Rina@2026!',
        ]);

        $token = $login->json('token');

        $response = $this->withToken($token)->getJson('/api/auth/me');

        $response->assertStatus(200)
            ->assertJsonPath('user.email', 'rina@student.smk.id')
            ->assertJsonMissing(['password']);

        $this->assertStringNotContainsString('Rina@2026!', $response->getContent());
    }

    public function test_role_middleware_blocks_wrong_role(): void
    {
        $student = User::where('email', 'budi@student.smk.id')->first();
        $token = $student->createToken('test')->plainTextToken;

        $this->withToken($token)->getJson('/api/admin/stats')->assertStatus(403);
    }
}
