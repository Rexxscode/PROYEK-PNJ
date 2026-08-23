<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Akun demo — email & password identik dengan userCredentials
     * pada frontend/app/lib/mock-data.ts agar login demo frontend langsung cocok.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Budi Santoso',
                'email' => 'budi@student.smk.id',
                'password' => 'Budi@2026!',
                'role' => 'student',
                'major' => 'Rekayasa Perangkat Lunak',
                'grade' => 'XII',
                'slug' => 'budi-santoso',
            ],
            [
                'name' => 'Rina Wulandari',
                'email' => 'rina@student.smk.id',
                'password' => 'Rina@2026!',
                'role' => 'student',
                'major' => 'Desain Komunikasi Visual',
                'grade' => 'XII',
                'slug' => 'rina-wulandari',
            ],
            [
                'name' => 'Hendra Susanto',
                'email' => 'hendra@student.smk.id',
                'password' => 'Hendra@2026!',
                'role' => 'student',
                'major' => 'Teknik Transmisi',
                'grade' => 'XII',
                'slug' => 'hendra-susanto',
            ],
            [
                'name' => 'Fajar Nugroho',
                'email' => 'fajar@student.smk.id',
                'password' => 'Fajar@2026!',
                'role' => 'student',
                'major' => 'Teknik Komputer dan Jaringan',
                'grade' => 'XII',
                'slug' => 'fajar-nugroho',
            ],
            [
                'name' => 'Admin SMK',
                'email' => 'admin@smk.id',
                'password' => 'Admin@2026!',
                'role' => 'admin',
                'major' => 'BK',
                'grade' => '-',
                'slug' => null,
            ],
            [
                'name' => 'HRD Industry',
                'email' => 'industry@hrd.com',
                'password' => 'Industry@2026!',
                'role' => 'industry',
                'major' => 'HRD',
                'grade' => '-',
                'slug' => null,
            ],
        ];

        foreach ($users as $data) {
            User::updateOrCreate(
                ['email' => $data['email']],
                $data
            );
        }
    }
}
