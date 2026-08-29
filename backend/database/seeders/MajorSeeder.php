<?php

namespace Database\Seeders;

use App\Models\Major;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Seeder;

class MajorSeeder extends Seeder
{
    public function run(): void
    {
        $majors = [
            ['short_code' => 'RPL', 'name' => 'Rekayasa Perangkat Lunak', 'description' => 'Rekayasa Perangkat Lunak'],
            ['short_code' => 'DKV', 'name' => 'Desain Komunikasi Visual', 'description' => 'Desain Komunikasi Visual'],
            ['short_code' => 'TKJ', 'name' => 'Teknik Komputer dan Jaringan', 'description' => 'Teknik Komputer dan Jaringan'],
            ['short_code' => 'TT', 'name' => 'Teknik Transmisi', 'description' => 'Teknik Transmisi'],
        ];

        foreach ($majors as $major) {
            Major::updateOrCreate(
                ['short_code' => $major['short_code']],
                $major
            );
        }
    }
}