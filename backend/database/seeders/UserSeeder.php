<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Student;
use App\Models\Industry;
use App\Models\Major;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            // Students
            [
                'name' => 'Budi Santoso',
                'email' => 'budi@student.smk.id',
                'password' => Hash::make('Budi@2026!'),
                'role' => 'student',
            ],
            [
                'name' => 'Rina Wulandari',
                'email' => 'rina@student.smk.id',
                'password' => Hash::make('Rina@2026!'),
                'role' => 'student',
            ],
            [
                'name' => 'Hendra Susanto',
                'email' => 'hendra@student.smk.id',
                'password' => Hash::make('Hendra@2026!'),
                'role' => 'student',
            ],
            [
                'name' => 'Fajar Nugroho',
                'email' => 'fajar@student.smk.id',
                'password' => Hash::make('Fajar@2026!'),
                'role' => 'student',
            ],
            [
                'name' => 'Andi Pratama',
                'email' => 'andi@student.smk.id',
                'password' => Hash::make('Andi@2026!'),
                'role' => 'student',
            ],
            [
                'name' => 'Rizky Aditya',
                'email' => 'rizky@student.smk.id',
                'password' => Hash::make('Rizky@2026!'),
                'role' => 'student',
            ],
            [
                'name' => 'Lestari Wijaya',
                'email' => 'lestari@student.smk.id',
                'password' => Hash::make('Lestari@2026!'),
                'role' => 'student',
            ],
            [
                'name' => 'Dedi Kurniawan',
                'email' => 'dedi@student.smk.id',
                'password' => Hash::make('Dedi@2026!'),
                'role' => 'student',
            ],
            // Admin
            [
                'name' => 'Admin SMK',
                'email' => 'admin@smk.id',
                'password' => Hash::make('Admin@2026!'),
                'role' => 'admin',
            ],
            // Industries
            [
                'name' => 'Sari Dewi',
                'email' => 'hrd@techcorp.com',
                'password' => Hash::make('TechCorp@2026!'),
                'role' => 'industry',
            ],
            [
                'name' => 'Rina Hartono',
                'email' => 'recruit@creativestudio.com',
                'password' => Hash::make('Creative@2026!'),
                'role' => 'industry',
            ],
            [
                'name' => 'Bambang Sutrisno',
                'email' => 'info@telkom.co.id',
                'password' => Hash::make('Telkom@2026!'),
                'role' => 'industry',
            ],
            [
                'name' => 'Maya Putri',
                'email' => 'hrd@digitaloutsource.co.id',
                'password' => Hash::make('Digital@2026!'),
                'role' => 'industry',
            ],
        ];

        foreach ($users as $userData) {
            $user = User::create($userData);

            if ($userData['role'] === 'student') {
                // Assign major based on email
                $majorCode = 'RPL';
                if (str_contains($userData['email'], 'rina')) $majorCode = 'DKV';
                if (str_contains($userData['email'], 'hendra')) $majorCode = 'TT';
                if (str_contains($userData['email'], 'fajar') || str_contains($userData['email'], 'dedi')) $majorCode = 'TKJ';

                $major = Major::where('short_code', $majorCode)->first();
                Student::create([
                    'user_id' => $user->id,
                    'major_id' => $major->short_code ?? 'RPL',
                    'grade' => 'XII',
                ]);
            } elseif ($userData['role'] === 'industry') {
                $status = str_contains($userData['email'], 'digitaloutsource') ? 'pending' : 'approved';
                Industry::create([
                    'user_id' => $user->id,
                    'company' => $this->getCompanyName($userData['email']),
                    'status' => $status,
                ]);
            }
        }
    }

    private function getCompanyName(string $email): string
    {
        if (str_contains($email, 'techcorp')) return 'TechCorp Indonesia';
        if (str_contains($email, 'creativestudio')) return 'Creative Studio';
        if (str_contains($email, 'telkom')) return 'PT Telkom Indonesia';
        if (str_contains($email, 'digitaloutsource')) return 'Digital Outsource';
        return 'Perusahaan';
    }
}