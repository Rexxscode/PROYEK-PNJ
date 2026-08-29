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
            ['id' => 'html-css', 'name' => 'HTML/CSS', 'category' => 'hard'],
            ['id' => 'javascript', 'name' => 'JavaScript', 'category' => 'hard'],
            ['id' => 'typescript', 'name' => 'TypeScript', 'category' => 'hard'],
            ['id' => 'react', 'name' => 'React/Next.js', 'category' => 'hard'],
            ['id' => 'nodejs', 'name' => 'Node.js', 'category' => 'hard'],
            ['id' => 'python', 'name' => 'Python', 'category' => 'hard'],
            ['id' => 'sql', 'name' => 'SQL/Database', 'category' => 'hard'],
            ['id' => 'git', 'name' => 'Git', 'category' => 'hard'],
            ['id' => 'docker', 'name' => 'Docker', 'category' => 'hard'],
            ['id' => 'rest-api', 'name' => 'REST API', 'category' => 'hard'],
            ['id' => 'express', 'name' => 'Express.js', 'category' => 'hard'],
            ['id' => 'figma', 'name' => 'Figma', 'category' => 'hard'],
            ['id' => 'photoshop', 'name' => 'Adobe Photoshop', 'category' => 'hard'],
            ['id' => 'illustrator', 'name' => 'Adobe Illustrator', 'category' => 'hard'],
            ['id' => 'ui-ux', 'name' => 'UI/UX Design', 'category' => 'hard'],
            ['id' => 'typography', 'name' => 'Typography', 'category' => 'hard'],
            ['id' => 'color-theory', 'name' => 'Color Theory', 'category' => 'hard'],
            ['id' => 'brand-identity', 'name' => 'Brand Identity', 'category' => 'hard'],
            ['id' => 'motion-graphics', 'name' => 'Motion Graphics', 'category' => 'hard'],
            ['id' => 'video-editing', 'name' => 'Video Editing', 'category' => 'hard'],

            // TKJ Skills (from mock-data.ts, major-roadmap.ts, career-match.ts)
            ['id' => 'networking-basics', 'name' => 'Networking Basics', 'category' => 'hard'],
            ['id' => 'cisco-ios', 'name' => 'Cisco IOS', 'category' => 'hard'],
            ['id' => 'fiber-optics', 'name' => 'Fiber Optics', 'category' => 'hard'],
            ['id' => 'mikrotik', 'name' => 'MikroTik', 'category' => 'hard'],
            ['id' => 'wireless-tech', 'name' => 'Wireless Technology', 'category' => 'hard'],
            ['id' => 'tcp-ip', 'name' => 'TCP/IP', 'category' => 'hard'],
            ['id' => 'network-security', 'name' => 'Network Security', 'category' => 'hard'],
            ['id' => 'linux-admin', 'name' => 'Linux Administration', 'category' => 'hard'],
            ['id' => 'windows-server', 'name' => 'Windows Server', 'category' => 'hard'],
            ['id' => 'active-directory', 'name' => 'Active Directory', 'category' => 'hard'],
            ['id' => 'cybersecurity-basics', 'name' => 'Cybersecurity Basics', 'category' => 'hard'],
            ['id' => 'virtualization', 'name' => 'Virtualization', 'category' => 'hard'],
            ['id' => 'shell-scripting', 'name' => 'Shell Scripting', 'category' => 'hard'],
            ['id' => 'hardware-troubleshooting', 'name' => 'Hardware Troubleshooting', 'category' => 'hard'],
            ['id' => 'database-mgmt', 'name' => 'Database Management', 'category' => 'hard'],
            ['id' => 'cloud-basics', 'name' => 'Cloud Basics (AWS/Azure)', 'category' => 'hard'],
            ['id' => 'cisco-networking', 'name' => 'Cisco Networking', 'category' => 'hard'],

            // DKV Skills (from mock-data.ts, major-roadmap.ts, career-match.ts)
            ['id' => 'ui-ux-dkv', 'name' => 'UI/UX Design DKV', 'category' => 'hard'],
            ['id' => 'color-theory-dkv', 'name' => 'Color Theory DKV', 'category' => 'hard'],
            ['id' => 'brand-identity-dkv', 'name' => 'Brand Identity DKV', 'category' => 'hard'],

            // Soft skills (from mock-data.ts, common across all majors)
            ['id' => 'communication', 'name' => 'Komunikasi', 'category' => 'soft'],
            ['id' => 'problem-solving', 'name' => 'Problem Solving', 'category' => 'soft'],
            ['id' => 'teamwork', 'name' => 'Teamwork', 'category' => 'soft'],
            ['id' => 'time-management', 'name' => 'Time Management', 'category' => 'soft'],
            ['id' => 'adaptabilitas', 'name' => 'Adaptabilitas', 'category' => 'soft'],
            ['id' => 'kreativitas', 'name' => 'Kreativitas', 'category' => 'soft'],
        ];

        foreach ($skills as $skill) {
            Skill::updateOrCreate(
                ['id' => $skill['id']],
                [
                    'name' => $skill['name'],
                    'category' => $skill['category'],
                    'level' => 1,
                ]
            );
        }
    }
}