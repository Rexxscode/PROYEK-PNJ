<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("ALTER TABLE industries MODIFY industry ENUM(
            'Teknologi Informasi',
            'Telekomunikasi',
            'Design & Kreatif',
            'Manufacturing',
            'Financial Services',
            'E-Commerce',
            'Media & Entertainment',
            'Konsultan',
            'Pendidikan',
            'Kesehatan',
            'Otomotif',
            'Logistik',
            'Energi',
            'Pariwisata',
            'Retail',
            'Startup'
        ) NOT NULL");
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE industries MODIFY industry ENUM(
            'Teknologi Informasi',
            'Telekomunikasi',
            'Design & Kreatif',
            'Manufacturing',
            'Financial Services',
            'E-Commerce',
            'Media & Entertainment',
            'Konsultan'
        ) NOT NULL");
    }
};