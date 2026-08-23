<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    /**
     * Master skill list.
     *
     * Sumber: frontend/app/lib/mock-data.ts (hard skills per jurusan + soft skill umum)
     * dan daftar suggestedSkills pada halaman post-job / my-jobs frontend.
     */
    public function run(): void
    {
        $hardSkills = [
            // Rekayasa Perangkat Lunak (RPL)
            'HTML/CSS', 'JavaScript', 'TypeScript', 'React/Next.js', 'Node.js',
            'Python', 'SQL/Database', 'Git', 'Docker', 'REST API',

            // Desain Komunikasi Visual (DKV)
            'Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'UI/UX Design',
            'Typography', 'Color Theory', 'Brand Identity', 'Motion Graphics', 'Video Editing',

            // Teknik Transmisi (TT)
            'Networking Basics', 'Cisco IOS', 'Fiber Optics', 'Mikrotik',
            'Wireless Technology', 'TCP/IP', 'Network Security', 'Linux',
            'VoIP', 'CCTV & Surveillance',

            // Teknik Komputer dan Jaringan (TKJ)
            'Windows Server', 'Linux Administration', 'Active Directory', 'Networking',
            'Cybersecurity Basics', 'Virtualization', 'Shell Scripting',
            'Hardware Troubleshooting', 'Database Management', 'Cloud Basics (AWS/Azure)',

            // Tambahan dari suggestedSkills form lowongan
            'Java', 'Copywriting', 'Digital Marketing', 'Cisco Networking',
            'MikroTik', 'Cloud (AWS/GCP)', 'Fiber Optik',
        ];

        $softSkills = [
            'Komunikasi', 'Problem Solving', 'Teamwork',
            'Time Management', 'Adaptabilitas', 'Kreativitas',
            'Communication', 'Team Leadership',
        ];

        foreach ($hardSkills as $name) {
            Skill::updateOrCreate(['name' => $name], ['category' => 'hard']);
        }

        foreach ($softSkills as $name) {
            Skill::updateOrCreate(['name' => $name], ['category' => 'soft']);
        }
    }
}
