<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicPortfolioTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed();
    }

    public function test_public_portfolio_by_slug_without_auth(): void
    {
        $response = $this->getJson('/api/portfolio/budi-santoso');

        $response->assertStatus(200)->assertJsonStructure([
            'user' => ['id', 'name', 'major', 'grade', 'avatar'],
            'skills',
            'readinessScore',
            'projects',
            'careerMatches',
            'publicUrl',
        ]);

        $json = $response->json();

        // Data publik yang diharapkan frontend
        $this->assertSame('Budi Santoso', $json['user']['name']);
        $this->assertSame(16, count($json['skills']));
        $this->assertSame(70, $json['readinessScore']);
        $this->assertCount(3, $json['careerMatches']);
    }

    public function test_public_portfolio_never_exposes_sensitive_data(): void
    {
        $response = $this->getJson('/api/portfolio/rina-wulandari');

        $content = strtolower($response->getContent());

        $response->assertStatus(200);

        // Tidak boleh ada email, password, role, token, atau slug internal user
        $this->assertStringNotContainsString('rina@student.smk.id', $content);
        $this->assertStringNotContainsString('email', $content);
        $this->assertStringNotContainsString('password', $content);
        $this->assertStringNotContainsString('rina@2026', $content);
        $this->assertStringNotContainsString('"role"', $content);
        $this->assertStringNotContainsString('token', $content);

        // Struktur user terbatas pada field publik
        $this->assertEqualsCanonicalizing(
            ['id', 'name', 'major', 'grade', 'avatar'],
            array_keys($response->json('user'))
        );
    }

    public function test_unknown_slug_returns_404_with_message(): void
    {
        $this->getJson('/api/portfolio/tidak-ada')
            ->assertStatus(404)
            ->assertJsonPath('message', 'Portfolio tidak ditemukan');
    }

    public function test_admin_and_industry_slugs_are_not_exposed(): void
    {
        // admin/industry tidak punya slug -> 404 walau ada datanya
        $this->getJson('/api/portfolio/admin-smk')->assertStatus(404);
    }
}
