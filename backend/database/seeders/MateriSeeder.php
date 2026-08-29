<?php

namespace Database\Seeders;

use App\Models\Materi;
use Illuminate\Database\Seeder;

class MateriSeeder extends Seeder
{
    public function run(): void
    {
        $materiList = [
            // RPL Materi
            ['id' => 'rpl-fullstack', 'major_id' => 'RPL', 'title' => 'Fullstack Developer', 'description' => 'Mengembangkan aplikasi web end-to-end frontend hingga backend.', 'icon' => 'layers'],
            ['id' => 'rpl-frontend', 'major_id' => 'RPL', 'title' => 'Frontend Developer', 'description' => 'Membangun antarmuka pengguna responsif dan interaktif.', 'icon' => 'monitor'],
            ['id' => 'rpl-backend', 'major_id' => 'RPL', 'title' => 'Backend Developer', 'description' => 'Mengembangkan server-side application, API, dan database.', 'icon' => 'server'],
            ['id' => 'rpl-devops', 'major_id' => 'RPL', 'title' => 'DevOps Engineer', 'description' => 'Mengelola infrastruktur, CI/CD, dan deployment.', 'icon' => 'git-branch'],
            ['id' => 'rpl-mobile', 'major_id' => 'RPL', 'title' => 'Mobile App Developer', 'description' => 'Membangun aplikasi mobile cross-platform dengan Flutter atau React Native.', 'icon' => 'smartphone'],

            // DKV Materi
            ['id' => 'dkv-motion', 'major_id' => 'DKV', 'title' => 'Motion Graphic Designer', 'description' => 'Membuat animasi dan video motion graphics untuk konten digital.', 'icon' => 'clapperboard'],
            ['id' => 'dkv-graphic', 'major_id' => 'DKV', 'title' => 'Graphic Designer', 'description' => 'Membuat visual branding, marketing material, dan ilustrasi.', 'icon' => 'palette'],
            ['id' => 'dkv-uiux', 'major_id' => 'DKV', 'title' => 'UI/UX Designer', 'description' => 'Merancang antarmuka pengguna yang intuitif dan user-friendly.', 'icon' => 'figma'],
            ['id' => 'dkv-product', 'major_id' => 'DKV', 'title' => 'Product Designer', 'description' => 'Mendesain produk digital dari riset hingga prototype interaktif.', 'icon' => 'box'],
            ['id' => 'dkv-brand', 'major_id' => 'DKV', 'title' => 'Brand Identity Designer', 'description' => 'Merancakan identitas visual merek dan guidelines.', 'icon' => 'fingerprint'],

            // TKJ Materi
            ['id' => 'tkj-sysadmin', 'major_id' => 'TKJ', 'title' => 'System Administrator', 'description' => 'Mengelola server, sistem operasi, dan infrastruktur IT.', 'icon' => 'server-cog'],
            ['id' => 'tkj-network', 'major_id' => 'TKJ', 'title' => 'Network Administrator', 'description' => 'Mengelola dan mengamankan jaringan perusahaan.', 'icon' => 'network'],
            ['id' => 'tkj-cloud', 'major_id' => 'TKJ', 'title' => 'Cloud Engineer', 'description' => 'Mengelola infrastruktur cloud, deployment, dan scaling.', 'icon' => 'cloud'],
            ['id' => 'tkj-security', 'major_id' => 'TKJ', 'title' => 'Cybersecurity Analyst', 'description' => 'Melindungi sistem dari serangan dan melakukan forensik digital.', 'icon' => 'shield'],
            ['id' => 'tkj-support', 'major_id' => 'TKJ', 'title' => 'IT Support Specialist', 'description' => 'Troubleshooting hardware, software, dan user support.', 'icon' => 'headset'],

            // TT Materi
            ['id' => 'tt-fiber', 'major_id' => 'TT', 'title' => 'Fiber Optic Specialist', 'description' => 'Instalasi, splicing, dan testing kabel fiber optik.', 'icon' => 'cable'],
            ['id' => 'tt-rf', 'major_id' => 'TT', 'title' => 'RF Engineer', 'description' => 'Perencanaan dan optimasi radio link wireless.', 'icon' => 'radio'],
            ['id' => 'tt-noc', 'major_id' => 'TT', 'title' => 'NOC Analyst', 'description' => 'Monitoring dan troubleshooting jaringan 24/7.', 'icon' => 'activity'],
            ['id' => 'tt-network', 'major_id' => 'TT', 'title' => 'Network Engineer', 'description' => 'Mengelola dan memelihara infrastruktur jaringan backbone.', 'icon' => 'router'],
            ['id' => 'tt-telecom', 'major_id' => 'TT', 'title' => 'Telecom Technician', 'description' => 'Instalasi dan maintenance sistem telekomunikasi.', 'icon' => 'antenna'],
        ];

        foreach ($materiList as $materi) {
            Materi::updateOrCreate(
                ['id' => $materi['id']],
                [
                    'major_id' => $materi['major_id'],
                    'title' => $materi['title'],
                    'description' => $materi['description'],
                    'skills' => [],
                    'icon' => $materi['icon'],
                ]
            );
        }
    }
}