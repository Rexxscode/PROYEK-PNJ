<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminApiTest extends TestCase
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

    public function test_admin_stats_match_documented_formulas(): void
    {
        $response = $this->withToken($this->tokenFor('admin@smk.id'))
            ->getJson('/api/admin/stats');

        $response->assertStatus(200)->assertJsonStructure([
            'totalStudents',
            'assessedStudents',
            'avgReadinessScore',
            'topCareers' => [['name', 'count']],
            'readinessByMajor' => [['major', 'score']],
        ]);

        // avgMatch per siswa: Budi 70, Rina 77, Hendra 75, Fajar 79 -> avg 75.25 -> 75
        $response->assertJson([
            'totalStudents' => 4,
            'assessedStudents' => 4,
            'avgReadinessScore' => 75,
        ]);

        // Semua karier seed unik -> count masing-masing 1, diambil top 5
        $topCareers = collect($response->json('topCareers'));
        $this->assertCount(5, $topCareers);
        $this->assertSame(1, $topCareers->pluck('count')->unique()->first());

        // Readiness per jurusan: RPL=70, DKV=77, TT=75, TKJ=79
        $byMajor = collect($response->json('readinessByMajor'))->pluck('score', 'major');
        $this->assertSame(70, $byMajor['Rekayasa Perangkat Lunak']);
        $this->assertSame(77, $byMajor['Desain Komunikasi Visual']);
        $this->assertSame(75, $byMajor['Teknik Transmisi']);
        $this->assertSame(79, $byMajor['Teknik Komputer dan Jaringan']);
    }

    public function test_admin_students_list_includes_readiness_summary(): void
    {
        $response = $this->withToken($this->tokenFor('admin@smk.id'))
            ->getJson('/api/admin/students');

        $response->assertStatus(200)
            ->assertJsonStructure([['id', 'name', 'email', 'role', 'major', 'grade', 'avatar', 'createdAt', 'score', 'status', 'topCareer']]);

        $json = collect($response->json());
        $this->assertCount(4, $json);

        $budi = $json->firstWhere('name', 'Budi Santoso');
        $this->assertSame('assessed', $budi['status']);
        $this->assertSame(70, $budi['score']);
        $this->assertSame('Backend Developer', $budi['topCareer']);

        // Tidak ada kebocoran password
        $this->assertStringNotContainsString('password', $response->getContent());
        $this->assertStringNotContainsString('@2026', $response->getContent());
    }

    public function test_pending_student_appears_with_null_top_career(): void
    {
        // Siswa baru tanpa asesmen
        User::create([
            'name' => 'Siswa Baru', 'email' => 'baru@student.smk.id', 'password' => 'password123',
            'role' => 'student', 'major' => 'Teknik Transmisi', 'grade' => 'X',
        ]);

        $response = $this->withToken($this->tokenFor('admin@smk.id'))
            ->getJson('/api/admin/students');

        $newStudent = collect($response->json())->firstWhere('name', 'Siswa Baru');
        $this->assertSame('pending', $newStudent['status']);
        $this->assertSame(0, $newStudent['score']);
        $this->assertNull($newStudent['topCareer']);

        // Stats ikut berubah
        $this->withToken($this->tokenFor('admin@smk.id'))
            ->getJson('/api/admin/stats')
            ->assertStatus(200)
            ->assertJsonPath('totalStudents', 5)
            ->assertJsonPath('assessedStudents', 4);
    }

    public function test_student_cannot_access_admin_endpoints(): void
    {
        $token = $this->tokenFor('budi@student.smk.id');

        $this->withToken($token)->getJson('/api/admin/stats')->assertStatus(403);
        $this->withToken($token)->getJson('/api/admin/students')->assertStatus(403);
    }

    public function test_guest_gets_unauthenticated(): void
    {
        $this->getJson('/api/admin/stats')->assertStatus(401);
        $this->getJson('/api/admin/students')->assertStatus(401);
    }
}
