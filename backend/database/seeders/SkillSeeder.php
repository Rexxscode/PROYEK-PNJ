<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        $skills = [
            // RPL Skills (from major-quiz.ts, mock-data.ts, career-match.ts)
            ['name' => 'HTML/CSS', 'category' => 'hard'],
            ['name' => 'JavaScript', 'category' => 'hard'],
            ['name' => 'TypeScript', 'category' => 'hard'],
            ['name' => 'React/Next.js', 'category' => 'hard'],
            ['name' => 'Node.js', 'category' => 'hard'],
            ['name' => 'Python', 'category' => 'hard'],
            ['name' => 'SQL/Database', 'category' => 'hard'],
            ['name' => 'Git', 'category' => 'hard'],
            ['name' => 'Docker', 'category' => 'hard'],
            ['name' => 'REST API', 'category' => 'hard'],
            ['name' => 'Express.js', 'category' => 'hard'],
            ['name' => 'Figma', 'category' => 'hard'],
            ['name' => 'Adobe Photoshop', 'category' => 'hard'],
            ['name' => 'Adobe Illustrator', 'category' => 'hard'],
            ['name' => 'UI/UX Design', 'category' => 'hard'],
            ['name' => 'Typography', 'category' => 'hard'],
            ['name' => 'Color Theory', 'category' => 'hard'],
            ['name' => 'Brand Identity', 'category' => 'hard'],
            ['name' => 'Motion Graphics', 'category' => 'hard'],
            ['name' => 'Video Editing', 'category' => 'hard'],

            // TKJ Skills (from mock-data.ts, major-roadmap.ts, career-match.ts)
            ['name' => 'Networking Basics', 'category' => 'hard'],
            ['name' => 'Cisco IOS', 'category' => 'hard'],
            ['name' => 'Fiber Optics', 'category' => 'hard'],
            ['name' => 'MikroTik', 'category' => 'hard'],
            ['name' => 'Wireless Technology', 'category' => 'hard'],
            ['name' => 'TCP/IP', 'category' => 'hard'],
            ['name' => 'Network Security', 'category' => 'hard'],
            ['name' => 'Linux Administration', 'category' => 'hard'],
            ['name' => 'Windows Server', 'category' => 'hard'],
            ['name' => 'Active Directory', 'category' => 'hard'],
            ['name' => 'Cybersecurity Basics', 'category' => 'hard'],
            ['name' => 'Virtualization', 'category' => 'hard'],
            ['name' => 'Shell Scripting', 'category' => 'hard'],
            ['name' => 'Hardware Troubleshooting', 'category' => 'hard'],
            ['name' => 'Database Management', 'category' => 'hard'],
            ['name' => 'Cloud Basics (AWS/Azure)', 'category' => 'hard'],
            ['name' => 'Cisco Networking', 'category' => 'hard'],

            // DKV Skills (from mock-data.ts, major-roadmap.ts, career-match.ts)
            ['name' => 'UI/UX Design DKV', 'category' => 'hard'],
            ['name' => 'Color Theory DKV', 'category' => 'hard'],
            ['name' => 'Brand Identity DKV', 'category' => 'hard'],

            // Soft skills (from mock-data.ts, common across all majors)
            ['name' => 'Komunikasi', 'category' => 'soft'],
            ['name' => 'Problem Solving', 'category' => 'soft'],
            ['name' => 'Teamwork', 'category' => 'soft'],
            ['name' => 'Time Management', 'category' => 'soft'],
            ['name' => 'Adaptabilitas', 'category' => 'soft'],
            ['name' => 'Kreativitas', 'category' => 'soft'],
        ];

        foreach ($skills as $skill) {
            Skill::updateOrCreate(
                ['name' => $skill['name']],
                [
                    'category' => $skill['category'],
                    'level' => 1,
                ]
            );
        }
    }
}