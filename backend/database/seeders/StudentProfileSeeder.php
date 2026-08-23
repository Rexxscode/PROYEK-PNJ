<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\RoadmapMilestone;
use App\Models\StudentCareerMatch;
use App\Models\StudentSkill;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class StudentProfileSeeder extends Seeder
{
    /**
     * Data profil siswa (level skill, career match, roadmap, proyek).
     *
     * Sumber: students.rpl / dkv / tt / tkj pada frontend/app/lib/mock-data.ts,
     * agar tampilan frontend seeded identik dengan versi mock.
     */
    public function run(): void
    {
        $softSkills = [
            'Komunikasi' => 4, 'Problem Solving' => 3, 'Teamwork' => 4,
            'Time Management' => 3, 'Adaptabilitas' => 4, 'Kreativitas' => 3,
        ];

        $students = [
            'budi@student.smk.id' => [
                'assessed_at' => '2026-01-15 00:00:00',
                'hardSkills' => [
                    'HTML/CSS' => 4, 'JavaScript' => 3, 'TypeScript' => 2, 'React/Next.js' => 2,
                    'Node.js' => 3, 'Python' => 2, 'SQL/Database' => 3, 'Git' => 2, 'Docker' => 1, 'REST API' => 2,
                ],
                'matches' => [
                    'Backend Developer' => 82, 'Fullstack Developer' => 75,
                    'Frontend Developer' => 70, 'DevOps Engineer' => 52,
                ],
                'milestones' => [
                    ['title' => 'Pahami REST API', 'description' => 'Pelajari konsep dasar REST API, HTTP methods, dan status codes.', 'status' => 'completed', 'skills' => ['REST API'], 'hours' => 8, 'resources' => [
                        ['title' => 'MDN Web Docs - REST API', 'url' => 'https://developer.mozilla.org', 'type' => 'article'],
                        ['title' => 'REST API Crash Course', 'url' => 'https://youtube.com', 'type' => 'video'],
                    ]],
                    ['title' => 'Kuasai Git & GitHub', 'description' => 'Pelajari version control, branching, dan kolaborasi tim.', 'status' => 'in_progress', 'skills' => ['Git'], 'hours' => 6, 'resources' => [
                        ['title' => 'Git Handbook', 'url' => 'https://docs.github.com', 'type' => 'article'],
                        ['title' => 'Git Tutorial', 'url' => 'https://youtube.com', 'type' => 'video'],
                    ]],
                    ['title' => 'Docker Dasar', 'description' => 'Pelajari containerization dengan Docker dan docker-compose.', 'status' => 'available', 'skills' => ['Docker'], 'hours' => 10, 'resources' => [
                        ['title' => 'Docker Getting Started', 'url' => 'https://docs.docker.com', 'type' => 'article'],
                    ]],
                    ['title' => 'PostgreSQL untuk Backend', 'description' => 'Pelajari SQL fundamentals, query optimization, dan indexing.', 'status' => 'available', 'skills' => ['SQL/Database'], 'hours' => 12, 'resources' => [
                        ['title' => 'PostgreSQL Tutorial', 'url' => 'https://postgresql.org', 'type' => 'article'],
                    ]],
                    ['title' => 'Build REST API Project', 'description' => 'Praktik membangun REST API dengan autentikasi dan CRUD.', 'status' => 'locked', 'skills' => ['Node.js', 'REST API'], 'hours' => 15, 'resources' => [
                        ['title' => 'Build REST API with Node.js', 'url' => 'https://youtube.com', 'type' => 'course'],
                    ]],
                ],
                'projects' => [
                    ['title' => 'Toko Online Sederhana', 'description' => 'Aplikasi e-commerce dengan keranjang belanja.', 'skills' => ['HTML/CSS', 'JavaScript'], 'completed_at' => '2025-11-20'],
                    ['title' => 'Weather Dashboard', 'description' => 'Dashboard cuaca real-time dari OpenWeather API.', 'skills' => ['JavaScript', 'REST API'], 'completed_at' => '2025-12-15'],
                    ['title' => 'Blog Personal', 'description' => 'Blog CRUD dengan Node.js dan MongoDB.', 'skills' => ['Node.js', 'JavaScript'], 'completed_at' => '2026-01-10'],
                ],
            ],

            'rina@student.smk.id' => [
                'assessed_at' => '2026-01-15 00:00:00',
                'hardSkills' => [
                    'Figma' => 4, 'Adobe Photoshop' => 3, 'Adobe Illustrator' => 3, 'UI/UX Design' => 4,
                    'Typography' => 3, 'Color Theory' => 4, 'Brand Identity' => 2, 'Motion Graphics' => 2,
                    'HTML/CSS' => 3, 'Video Editing' => 2,
                ],
                'matches' => [
                    'UI/UX Designer' => 88, 'Graphic Designer' => 82,
                    'Brand Identity Designer' => 72, 'Motion Designer' => 65,
                ],
                'milestones' => [
                    ['title' => 'Figma Fundamentals', 'description' => 'Kuasai tools Figma: auto layout, component, dan prototyping.', 'status' => 'completed', 'skills' => ['Figma', 'UI/UX Design'], 'hours' => 10, 'resources' => [
                        ['title' => 'Figma Official Tutorials', 'url' => 'https://figma.com', 'type' => 'video'],
                        ['title' => 'Figma 101 Course', 'url' => 'https://youtube.com', 'type' => 'course'],
                    ]],
                    ['title' => 'Color Theory & Typography', 'description' => 'Pelajari teori warna, tipografi, dan hierarki visual.', 'status' => 'in_progress', 'skills' => ['Color Theory', 'Typography'], 'hours' => 8, 'resources' => [
                        ['title' => 'Color Theory for Designers', 'url' => 'https://medium.com', 'type' => 'article'],
                    ]],
                    ['title' => 'UI/UX Design Systems', 'description' => 'Buat design system yang konsisten dan scalable.', 'status' => 'available', 'skills' => ['UI/UX Design'], 'hours' => 12, 'resources' => [
                        ['title' => 'Design Systems 101', 'url' => 'https://designsystems.com', 'type' => 'article'],
                    ]],
                    ['title' => 'Adobe Illustrator Mastery', 'description' => 'Kuasai vector illustration dan branding assets.', 'status' => 'available', 'skills' => ['Adobe Illustrator', 'Brand Identity'], 'hours' => 15, 'resources' => [
                        ['title' => 'Adobe Illustrator Tutorial', 'url' => 'https://youtube.com', 'type' => 'video'],
                    ]],
                    ['title' => 'Portfolio Design Project', 'description' => 'Buat portfolio showcase lengkap dengan case study.', 'status' => 'locked', 'skills' => ['Figma', 'UI/UX Design', 'Brand Identity'], 'hours' => 20, 'resources' => [
                        ['title' => 'How to Build a Design Portfolio', 'url' => 'https://youtube.com', 'type' => 'article'],
                    ]],
                ],
                'projects' => [
                    ['title' => 'Brand Identity Startup', 'description' => 'Desain logo, warna, dan guidelines untuk startup fintech.', 'skills' => ['Adobe Illustrator', 'Brand Identity', 'Color Theory'], 'completed_at' => '2025-11-25'],
                    ['title' => 'Mobile App UI Kit', 'description' => 'UI kit lengkap 50+ komponen untuk app e-commerce.', 'skills' => ['Figma', 'UI/UX Design'], 'completed_at' => '2025-12-20'],
                    ['title' => 'Poster Event Musik', 'description' => 'Serangkaian poster promosi untuk event musik sekolah.', 'skills' => ['Adobe Photoshop', 'Typography'], 'completed_at' => '2026-01-15'],
                ],
            ],

            'hendra@student.smk.id' => [
                'assessed_at' => '2026-01-15 00:00:00',
                'hardSkills' => [
                    'Networking Basics' => 4, 'Cisco IOS' => 3, 'Fiber Optics' => 3, 'Mikrotik' => 2,
                    'Wireless Technology' => 3, 'TCP/IP' => 4, 'Network Security' => 2, 'Linux' => 2,
                    'VoIP' => 1, 'CCTV & Surveillance' => 2,
                ],
                'matches' => [
                    'Network Engineer' => 80, 'Telecom Technician' => 75, 'NOC Analyst' => 70,
                ],
                'milestones' => [
                    ['title' => 'Networking Fundamentals', 'description' => 'Pelajari OSI model, TCP/IP, subnetting, dan routing dasar.', 'status' => 'completed', 'skills' => ['Networking Basics', 'TCP/IP'], 'hours' => 12, 'resources' => [
                        ['title' => 'CCNA Networking Basics', 'url' => 'https://cisco.com', 'type' => 'course'],
                        ['title' => 'Network+ Study Guide', 'url' => 'https://youtube.com', 'type' => 'video'],
                    ]],
                    ['title' => 'Cisco IOS Configuration', 'description' => 'Konfigurasi router dan switch Cisco: VLAN, routing, ACL.', 'status' => 'in_progress', 'skills' => ['Cisco IOS'], 'hours' => 15, 'resources' => [
                        ['title' => 'Cisco Packet Tracer Lab', 'url' => 'https://cisco.com', 'type' => 'practice'],
                    ]],
                    ['title' => 'Fiber Optics & Wireless', 'description' => 'Pelajari instalasi fiber optic dan konfigurasi wireless AP.', 'status' => 'available', 'skills' => ['Fiber Optics', 'Wireless Technology'], 'hours' => 10, 'resources' => [
                        ['title' => 'Fiber Optic Tutorial', 'url' => 'https://youtube.com', 'type' => 'video'],
                    ]],
                    ['title' => 'Network Security Basics', 'description' => 'Pelajari firewall, VPN, dan keamanan jaringan.', 'status' => 'available', 'skills' => ['Network Security'], 'hours' => 12, 'resources' => [
                        ['title' => 'Network Security Course', 'url' => 'https://youtube.com', 'type' => 'course'],
                    ]],
                    ['title' => 'VoIP & Surveillance Setup', 'description' => 'Setup sistem VoIP dan CCTV berbasis IP.', 'status' => 'locked', 'skills' => ['VoIP', 'CCTV & Surveillance'], 'hours' => 10, 'resources' => [
                        ['title' => 'VoIP Setup Guide', 'url' => 'https://youtube.com', 'type' => 'article'],
                    ]],
                ],
                'projects' => [
                    ['title' => 'Lab Jaringan Sekolah', 'description' => 'Setup jaringan lab dengan 30 workstation dan VLAN.', 'skills' => ['Networking Basics', 'Cisco IOS'], 'completed_at' => '2025-11-30'],
                    ['title' => 'WiFi Hotspot Management', 'description' => 'Deploy captive portal WiFi dengan Mikrotik.', 'skills' => ['Mikrotik', 'Wireless Technology'], 'completed_at' => '2025-12-18'],
                    ['title' => 'CCTV IP System', 'description' => 'Instalasi 16 channel CCTV IP untuk area sekolah.', 'skills' => ['CCTV & Surveillance', 'Networking Basics'], 'completed_at' => '2026-01-20'],
                ],
            ],

            'fajar@student.smk.id' => [
                'assessed_at' => '2026-01-15 00:00:00',
                'hardSkills' => [
                    'Windows Server' => 3, 'Linux Administration' => 3, 'Active Directory' => 2, 'Networking' => 4,
                    'Cybersecurity Basics' => 2, 'Virtualization' => 2, 'Shell Scripting' => 2,
                    'Hardware Troubleshooting' => 4, 'Database Management' => 2, 'Cloud Basics (AWS/Azure)' => 1,
                ],
                'matches' => [
                    'IT Support Specialist' => 85, 'System Administrator' => 78, 'Network Administrator' => 75,
                ],
                'milestones' => [
                    ['title' => 'Windows Server Administration', 'description' => 'Pelajari instalasi, konfigurasi, dan manajemen Windows Server.', 'status' => 'completed', 'skills' => ['Windows Server', 'Active Directory'], 'hours' => 12, 'resources' => [
                        ['title' => 'Windows Server Tutorial', 'url' => 'https://microsoft.com', 'type' => 'course'],
                    ]],
                    ['title' => 'Linux Administration', 'description' => 'Kuasai Linux: command line, service management, dan security.', 'status' => 'in_progress', 'skills' => ['Linux Administration'], 'hours' => 10, 'resources' => [
                        ['title' => 'Linux Basics for Beginners', 'url' => 'https://linuxfoundation.org', 'type' => 'course'],
                        ['title' => 'Linux Command Line Tutorial', 'url' => 'https://youtube.com', 'type' => 'video'],
                    ]],
                    ['title' => 'Cybersecurity Fundamentals', 'description' => 'Pelajari konsep keamanan: firewall, IDS/IPS, hardening.', 'status' => 'available', 'skills' => ['Cybersecurity Basics'], 'hours' => 12, 'resources' => [
                        ['title' => 'Cybersecurity 101', 'url' => 'https://cybrary.it', 'type' => 'course'],
                    ]],
                    ['title' => 'Virtualization & Cloud', 'description' => 'Pelajari VMware, Hyper-V, dan dasar AWS/Azure.', 'status' => 'available', 'skills' => ['Virtualization', 'Cloud Basics (AWS/Azure)'], 'hours' => 10, 'resources' => [
                        ['title' => 'VMware Tutorial', 'url' => 'https://youtube.com', 'type' => 'video'],
                    ]],
                    ['title' => 'IT Infrastructure Project', 'description' => 'Setup lengkap: server, jaringan, dan security untuk kantor.', 'status' => 'locked', 'skills' => ['Windows Server', 'Networking', 'Cybersecurity Basics'], 'hours' => 20, 'resources' => [
                        ['title' => 'IT Infrastructure Setup', 'url' => 'https://youtube.com', 'type' => 'course'],
                    ]],
                ],
                'projects' => [
                    ['title' => 'Lab Server Sekolah', 'description' => 'Setup 3 server: AD, DNS/DHCP, dan File Server.', 'skills' => ['Windows Server', 'Active Directory'], 'completed_at' => '2025-11-22'],
                    ['title' => 'Linux Web Server', 'description' => 'Deploy LAMP stack di Ubuntu Server dengan SSL.', 'skills' => ['Linux Administration', 'Networking'], 'completed_at' => '2025-12-10'],
                    ['title' => 'Helpdesk Ticketing System', 'description' => 'Sistem tiket support berbasis web untuk lab IT.', 'skills' => ['Hardware Troubleshooting', 'Windows Server'], 'completed_at' => '2026-01-12'],
                ],
            ],
        ];

        foreach ($students as $email => $data) {
            $user = User::where('email', $email)->firstOrFail();
            $assessedAt = Carbon::parse($data['assessed_at']);

            // Skill levels (hard + soft)
            $allLevels = $data['hardSkills'] + $softSkills;
            foreach ($allLevels as $skillName => $level) {
                $skillId = \App\Models\Skill::query()->where('name', $skillName)->value('id');

                if ($skillId === null) {
                    throw new \RuntimeException("StudentProfileSeeder: skill '{$skillName}' tidak ditemukan. Jalankan SkillSeeder lebih dulu.");
                }

                StudentSkill::updateOrCreate(
                    ['user_id' => $user->id, 'skill_id' => $skillId],
                    ['level' => $level]
                );
            }

            // Career matches
            foreach ($data['matches'] as $careerTitle => $percentage) {
                $careerId = \App\Models\Career::query()->where('title', $careerTitle)->value('id');

                if ($careerId === null) {
                    throw new \RuntimeException("StudentProfileSeeder: karier '{$careerTitle}' tidak ditemukan. Jalankan CareerSeeder lebih dulu.");
                }

                StudentCareerMatch::updateOrCreate(
                    ['user_id' => $user->id, 'career_id' => $careerId],
                    ['match_percentage' => $percentage]
                );
            }

            // Roadmap milestones
            foreach ($data['milestones'] as $index => $m) {
                RoadmapMilestone::updateOrCreate(
                    ['user_id' => $user->id, 'title' => $m['title']],
                    [
                        'description' => $m['description'],
                        'status' => $m['status'],
                        'estimated_hours' => $m['hours'],
                        'sequence' => $index + 1,
                        'skills' => $m['skills'],
                        'resources' => $m['resources'],
                    ]
                );
            }

            // Projects
            foreach ($data['projects'] as $p) {
                Project::updateOrCreate(
                    ['user_id' => $user->id, 'title' => $p['title']],
                    [
                        'description' => $p['description'],
                        'skills' => $p['skills'],
                        'completed_at' => $p['completed_at'],
                    ]
                );
            }

            $user->forceFill(['assessed_at' => $assessedAt])->save();
        }
    }
}
