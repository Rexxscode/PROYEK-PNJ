<?php

namespace Database\Seeders;

use App\Models\Career;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CareerSeeder extends Seeder
{
    /**
     * Master karier + skill wajib beserta level minimal.
     *
     * Sumber: careerMatches per jurusan pada frontend/app/lib/mock-data.ts.
     */
    public function run(): void
    {
        $careers = [
            [
                'title' => 'Backend Developer',
                'description' => 'Mengembangkan server-side application, API, dan database.',
                'category' => 'Software Engineering',
                'skills' => ['Node.js' => 4, 'REST API' => 4, 'SQL/Database' => 4, 'Git' => 4],
            ],
            [
                'title' => 'Fullstack Developer',
                'description' => 'Mengembangkan aplikasi web end-to-end frontend hingga backend.',
                'category' => 'Software Engineering',
                'skills' => ['HTML/CSS' => 5, 'React/Next.js' => 4, 'Node.js' => 4, 'JavaScript' => 4],
            ],
            [
                'title' => 'Frontend Developer',
                'description' => 'Membangun antarmuka pengguna responsif dan interaktif.',
                'category' => 'Software Engineering',
                'skills' => ['HTML/CSS' => 5, 'JavaScript' => 5, 'React/Next.js' => 5],
            ],
            [
                'title' => 'DevOps Engineer',
                'description' => 'Mengelola infrastruktur, CI/CD, dan deployment.',
                'category' => 'Infrastructure',
                'skills' => ['Docker' => 5, 'Git' => 5, 'Node.js' => 3],
            ],
            [
                'title' => 'UI/UX Designer',
                'description' => 'Merancang antarmuka pengguna yang intuitif dan user-friendly.',
                'category' => 'Design',
                'skills' => ['UI/UX Design' => 5, 'Figma' => 5, 'Typography' => 4],
            ],
            [
                'title' => 'Graphic Designer',
                'description' => 'Membuat visual branding, marketing material, dan ilustrasi.',
                'category' => 'Design',
                'skills' => ['Adobe Photoshop' => 5, 'Adobe Illustrator' => 5, 'Color Theory' => 4],
            ],
            [
                'title' => 'Motion Designer',
                'description' => 'Membuat animasi dan video motion graphics.',
                'category' => 'Design',
                'skills' => ['Motion Graphics' => 5, 'Video Editing' => 4],
            ],
            [
                'title' => 'Brand Identity Designer',
                'description' => 'Merancang identitas visual merek dan guidelines.',
                'category' => 'Design',
                'skills' => ['Brand Identity' => 5, 'Adobe Illustrator' => 4, 'Color Theory' => 4],
            ],
            [
                'title' => 'Network Engineer',
                'description' => 'Mengelola dan memelihara infrastruktur jaringan perusahaan.',
                'category' => 'Networking',
                'skills' => ['Networking Basics' => 5, 'Cisco IOS' => 4, 'TCP/IP' => 5],
            ],
            [
                'title' => 'Telecom Technician',
                'description' => 'Instalasi dan maintenance sistem telekomunikasi.',
                'category' => 'Telecom',
                'skills' => ['Fiber Optics' => 4, 'Wireless Technology' => 4, 'VoIP' => 3],
            ],
            [
                'title' => 'NOC Analyst',
                'description' => 'Monitoring dan troubleshooting jaringan 24/7.',
                'category' => 'Networking',
                'skills' => ['Networking Basics' => 4, 'Network Security' => 3, 'Linux' => 3],
            ],
            [
                'title' => 'System Administrator',
                'description' => 'Mengelola server, sistem operasi, dan infrastruktur IT.',
                'category' => 'IT Infrastructure',
                'skills' => ['Windows Server' => 4, 'Linux Administration' => 4, 'Active Directory' => 3],
            ],
            [
                'title' => 'Network Administrator',
                'description' => 'Mengelola dan mengamankan jaringan perusahaan.',
                'category' => 'IT Infrastructure',
                'skills' => ['Networking' => 5, 'Cybersecurity Basics' => 4, 'Linux Administration' => 3],
            ],
            [
                'title' => 'IT Support Specialist',
                'description' => 'Troubleshooting hardware, software, dan user support.',
                'category' => 'IT Support',
                'skills' => ['Hardware Troubleshooting' => 5, 'Windows Server' => 3, 'Networking' => 3],
            ],
        ];

        foreach ($careers as $data) {
            $career = Career::updateOrCreate(
                ['title' => $data['title']],
                ['description' => $data['description'], 'category' => $data['category']]
            );

            foreach ($data['skills'] as $skillName => $requiredLevel) {
                $skillId = DB::table('skills')->where('name', $skillName)->value('id');

                if ($skillId === null) {
                    throw new \RuntimeException("CareerSeeder: skill '{$skillName}' tidak ditemukan. Jalankan SkillSeeder lebih dulu.");
                }

                DB::table('career_skill')->updateOrInsert(
                    ['career_id' => $career->id, 'skill_id' => $skillId],
                    ['required_level' => $requiredLevel]
                );
            }
        }
    }
}
