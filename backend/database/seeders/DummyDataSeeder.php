<?php

namespace Database\Seeders;

use App\Models\Student;
use App\Models\Skill;
use App\Models\Materi;
use App\Models\Major;
use App\Models\RoadmapMilestone;
use App\Models\Certificate;
use App\Models\AssessmentResult;
use App\Models\StudentRoadmapProgress;
use App\Models\Project;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Database\Seeder;

class DummyDataSeeder extends Seeder
{
    public function run(): void
    {
        $students = Student::with('major')->get();
        $skills = Skill::all();
        $materis = Materi::all();

        if ($students->isEmpty() || $skills->isEmpty()) {
            return;
        }

        // ── Student skills (5-30 records) ──────────────────────────────────
        $skillCount = 0;
        foreach ($students as $student) {
            $assigned = [];
            $n = rand(5, 8);
            for ($i = 0; $i < $n && $skillCount < 60; $i++) {
                $skill = $skills->random();
                if (isset($assigned[$skill->id])) {
                    continue;
                }
                $assigned[$skill->id] = true;
                $skillCount++;
                $student->skills()->attach($skill->id, [
                    'level' => rand(1, 5),
                    'achieved_at' => now()->subDays(rand(10, 200)),
                ]);
            }
        }

        // ── Projects (5-30 records) ────────────────────────────────────────
        $projectTitles = [
            ['title' => 'Aplikasi Kasir Toko', 'skills' => ['React/Next.js', 'Node.js', 'SQL/Database']],
            ['title' => 'Landing Page E-Commerce', 'skills' => ['HTML/CSS', 'JavaScript', 'Figma']],
            ['title' => 'Desain Brand Identity UMKM', 'skills' => ['Adobe Photoshop', 'Adobe Illustrator']],
            ['title' => 'Konfigurasi Jaringan Kantor', 'skills' => ['Networking', 'MikroTik', 'Cisco Networking']],
            ['title' => 'Monitoring Server Linux', 'skills' => ['Linux Administration', 'Docker']],
            ['title' => 'Portofolio Website', 'skills' => ['React/Next.js', 'TypeScript', 'HTML/CSS']],
            ['title' => 'Aplikasi Mobile Absensi', 'skills' => ['React Native', 'JavaScript', 'REST API']],
            ['title' => 'Instalasi Fiber Optic Rumah', 'skills' => ['Fiber Optics', 'Networking Basics']],
            ['title' => 'UI Kit Design System', 'skills' => ['Figma', 'UI/UX Design']],
            ['title' => 'Sistem Monitoring CCTV', 'skills' => ['Networking', 'Windows Server']],
        ];

        $projectCount = 0;
        foreach ($students as $student) {
            $n = rand(2, 4);
            for ($i = 0; $i < $n && $projectCount < 30; $i++) {
                $p = $projectTitles[array_rand($projectTitles)];
                $projectCount++;
                Project::create([
                    'student_id' => $student->id,
                    'title' => $p['title'] . ' #' . ($i + 1),
                    'description' => 'Proyek praktik ' . $p['title'] . ' oleh ' . $student->name . '.',
                    'skills_json' => json_encode($p['skills']),
                    'project_url' => 'https://github.com/example/project',
                    'completed_at' => now()->subDays(rand(20, 300))->toDateString(),
                ]);
            }
        }

        // ── Assessment results (one per student, 5-30) ─────────────────────
        $assessmentCount = 0;
        foreach ($students as $student) {
            if (!$student->major) {
                continue;
            }
            $assessmentCount++;
            AssessmentResult::create([
                'student_id' => $student->id,
                'major_id' => $student->major->short_code,
                'score' => rand(35, 100),
                'level' => rand(1, 5),
                'skill_scores' => json_encode([]),
                'answered_at' => now()->subDays(rand(5, 120)),
            ]);
        }

        // ── Certificates (5-30 records) ────────────────────────────────────
        if ($materis->isNotEmpty()) {
            $certCount = 0;
            foreach ($students as $student) {
                $n = rand(1, 3);
                for ($i = 0; $i < $n && $certCount < 30; $i++) {
                    $materi = $materis->random();
                    $passed = rand(0, 1) === 1;
                    $certCount++;
                    Certificate::updateOrCreate(
                        ['student_id' => $student->id, 'materi_id' => $materi->id],
                        [
                            'major_id' => $materi->major_id,
                            'score' => rand(8, 20),
                            'total' => 20,
                            'passed' => $passed ? 1 : 0,
                            'certificate_date' => $passed ? now()->subDays(rand(5, 120))->toDateString() : null,
                            'attempts' => rand(1, 3),
                        ]
                    );
                }
            }
        }

        // ── Roadmap progress (5-30 records) ────────────────────────────────
        $milestones = RoadmapMilestone::all();
        if ($milestones->isNotEmpty()) {
            $progressCount = 0;
            foreach ($students as $student) {
                $n = rand(3, 6);
                $used = [];
                for ($i = 0; $i < $n && $progressCount < 40; $i++) {
                    $ms = $milestones->random();
                    if (isset($used[$ms->id])) {
                        continue;
                    }
                    $used[$ms->id] = true;
                    $progressCount++;
                    StudentRoadmapProgress::updateOrCreate(
                        ['student_id' => $student->id, 'milestone_id' => $ms->id],
                        [
                            'status' => ['in_progress', 'completed'][rand(0, 1)],
                            'resources_viewed' => json_encode([]),
                            'completed_at' => rand(0, 1) === 1 ? now()->subDays(rand(5, 60)) : null,
                        ]
                    );
                }
            }
        }

        // ── Notifications (5-30 records) ───────────────────────────────────
        $users = User::all();
        if ($users->isNotEmpty()) {
            $notificationTypes = ['assessment_done', 'materi_passed', 'roadmap_update', 'system'];
            $notifCount = 0;
            foreach ($users->where('role', 'student')->take(8) as $user) {
                for ($i = 0; $i < 3 && $notifCount < 30; $i++) {
                    $notifCount++;
                    Notification::create([
                        'user_id' => $user->id,
                        'role' => 'student',
                        'target_email' => $user->email,
                        'title' => 'Pembaruan Asesmen',
                        'message' => 'Hasil asesmen jurusan kamu sudah tersedia. Silakan cek Dashboard.',
                        'type' => $notificationTypes[array_rand($notificationTypes)],
                        'read' => rand(0, 1),
                        'read_at' => rand(0, 1) === 1 ? now()->subHours(rand(1, 72)) : null,
                    ]);
                }
            }
        }
    }
}