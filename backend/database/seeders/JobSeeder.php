<?php

namespace Database\Seeders;

use App\Models\Job;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JobSeeder extends Seeder
{
    /**
     * Lowongan kerja.
     *
     * Sumber: jobOpportunities pada mock-data.ts (12 job) dan defaultJobs
     * halaman my-jobs frontend (3 job, lengkap dengan salary).
     */
    public function run(): void
    {
        $industryId = User::query()->where('email', 'industry@hrd.com')->value('id');

        if ($industryId === null) {
            throw new \RuntimeException('JobSeeder: user industry@hrd.com tidak ditemukan. Jalankan UserSeeder lebih dulu.');
        }

        $jobs = [
            // === jobOpportunities mock (Budi/RPL) ===
            ['company' => 'PT TechCorp Digital', 'title' => 'Backend Developer Intern', 'type' => 'magang', 'location' => 'Jakarta Selatan (Hybrid)', 'description' => 'Magang pengembangan REST API dan microservices.', 'skills' => ['Node.js', 'REST API', 'SQL/Database'], 'posted_at' => '2026-02-01 00:00:00', 'deadline' => '2026-03-15'],
            ['company' => 'PT WebSolusi Nusantara', 'title' => 'Junior Fullstack Developer', 'type' => 'fulltime', 'location' => 'Bandung (On-site)', 'description' => 'Pengembangan aplikasi web React dan Node.js.', 'skills' => ['React/Next.js', 'Node.js', 'JavaScript'], 'posted_at' => '2026-01-25 00:00:00', 'deadline' => '2026-03-01'],
            ['company' => 'PT Aplikasi Kreatif', 'title' => 'Frontend Developer (Part-time)', 'type' => 'parttime', 'location' => 'Yogyakarta (Hybrid)', 'description' => 'Developer frontend dengan React dan Tailwind.', 'skills' => ['HTML/CSS', 'React/Next.js', 'JavaScript'], 'posted_at' => '2026-02-12 00:00:00', 'deadline' => '2026-03-25'],

            // === jobOpportunities mock (Rina/DKV) ===
            ['company' => 'PT Kreatif Digital', 'title' => 'UI/UX Design Intern', 'type' => 'magang', 'location' => 'Jakarta (Hybrid)', 'description' => 'Magang desain antarmuka aplikasi mobile dan web.', 'skills' => ['Figma', 'UI/UX Design'], 'posted_at' => '2026-02-05 00:00:00', 'deadline' => '2026-03-20'],
            ['company' => 'PT Media Kreatif', 'title' => 'Graphic Designer (Part-time)', 'type' => 'parttime', 'location' => 'Remote', 'description' => 'Desain material marketing dan social media.', 'skills' => ['Adobe Photoshop', 'Adobe Illustrator'], 'posted_at' => '2026-02-10 00:00:00', 'deadline' => '2026-03-25'],
            ['company' => 'PT Animasi Studio', 'title' => 'Motion Graphics Junior', 'type' => 'fulltime', 'location' => 'Bandung (On-site)', 'description' => 'Buat animasi untuk iklan dan konten digital.', 'skills' => ['Motion Graphics', 'Video Editing'], 'posted_at' => '2026-02-08 00:00:00', 'deadline' => '2026-03-15'],

            // === jobOpportunities mock (Hendra/TT) ===
            ['company' => 'PT Telkom Indonesia', 'title' => 'Network Technician Intern', 'type' => 'magang', 'location' => 'Surabaya (On-site)', 'description' => 'Magang instalasi dan maintenance jaringan telekomunikasi.', 'skills' => ['Networking Basics', 'Fiber Optics', 'Cisco IOS'], 'posted_at' => '2026-02-01 00:00:00', 'deadline' => '2026-03-15'],
            ['company' => 'PT InfraNet Solutions', 'title' => 'Junior Network Engineer', 'type' => 'fulltime', 'location' => 'Jakarta (On-site)', 'description' => 'Konfigurasi dan monitoring infrastruktur jaringan klien.', 'skills' => ['Cisco IOS', 'TCP/IP', 'Network Security'], 'posted_at' => '2026-02-05 00:00:00', 'deadline' => '2026-03-20'],
            ['company' => 'PT SmartCom', 'title' => 'Telecom Field Technician', 'type' => 'magang', 'location' => 'Bandung', 'description' => 'Field technician untuk instalasi fiber optic.', 'skills' => ['Fiber Optics', 'Wireless Technology'], 'posted_at' => '2026-02-10 00:00:00', 'deadline' => '2026-03-25'],

            // === jobOpportunities mock (Fajar/TKJ) ===
            ['company' => 'PT DataCenter Indonesia', 'title' => 'System Admin Intern', 'type' => 'magang', 'location' => 'Jakarta (On-site)', 'description' => 'Magang administrasi server dan monitoring.', 'skills' => ['Windows Server', 'Linux Administration'], 'posted_at' => '2026-02-01 00:00:00', 'deadline' => '2026-03-15'],
            ['company' => 'PT SecureNet', 'title' => 'IT Support Specialist', 'type' => 'fulltime', 'location' => 'Bandung (On-site)', 'description' => 'Helpdesk dan troubleshooting IT karyawan.', 'skills' => ['Hardware Troubleshooting', 'Networking', 'Windows Server'], 'posted_at' => '2026-02-05 00:00:00', 'deadline' => '2026-03-20'],
            ['company' => 'PT CloudHost Indonesia', 'title' => 'Junior Cloud Engineer', 'type' => 'magang', 'location' => 'Remote', 'description' => 'Magang setup dan maintenance cloud server.', 'skills' => ['Linux Administration', 'Cloud Basics (AWS/Azure)', 'Networking'], 'posted_at' => '2026-02-10 00:00:00', 'deadline' => '2026-03-25'],

            // === defaultJobs halaman my-jobs frontend ===
            ['company' => 'TechCorp Indonesia', 'title' => 'Frontend Developer Intern', 'type' => 'magang', 'location' => 'Jakarta Selatan', 'description' => 'Magang 3 bulan, project React/Next.js', 'skills' => ['React/Next.js', 'TypeScript', 'HTML/CSS'], 'posted_at' => '2026-02-01 00:00:00', 'deadline' => '2026-03-15', 'salary' => 'Rp 2-3 juta/bulan'],
            ['company' => 'TechCorp Indonesia', 'title' => 'Junior Backend Developer', 'type' => 'fulltime', 'location' => 'Remote', 'description' => 'Full-time developer dengan pengalaman Node.js', 'skills' => ['Node.js', 'SQL/Database', 'REST API'], 'posted_at' => '2026-02-01 00:00:00', 'deadline' => '2026-04-01', 'salary' => 'Rp 4-6 juta/bulan'],
            ['company' => 'Creative Studio', 'title' => 'UI/UX Design Freelance', 'type' => 'freelance', 'location' => 'Bandung', 'description' => 'Project desain UI/UX mobile app', 'skills' => ['Figma', 'UI/UX Design', 'HTML/CSS'], 'posted_at' => '2026-02-01 00:00:00', 'deadline' => '2026-03-30', 'salary' => 'Negosiasi'],
        ];

        foreach ($jobs as $data) {
            $job = Job::updateOrCreate(
                ['company' => $data['company'], 'title' => $data['title']],
                [
                    'posted_by' => $industryId,
                    'type' => $data['type'],
                    'location' => $data['location'],
                    'description' => $data['description'],
                    'salary' => $data['salary'] ?? null,
                    'deadline' => $data['deadline'],
                    'posted_at' => $data['posted_at'],
                ]
            );

            foreach ($data['skills'] as $skillName) {
                $skillId = DB::table('skills')->where('name', $skillName)->value('id');

                if ($skillId === null) {
                    throw new \RuntimeException("JobSeeder: skill '{$skillName}' tidak ditemukan. Jalankan SkillSeeder lebih dulu.");
                }

                DB::table('job_skill')->updateOrInsert(
                    ['job_id' => $job->id, 'skill_id' => $skillId]
                );
            }
        }
    }
}
