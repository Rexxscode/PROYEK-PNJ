<?php

namespace Database\Seeders;

use App\Models\AppNotification;
use Illuminate\Database\Seeder;

class NotificationSeeder extends Seeder
{
    /**
     * Contoh notifikasi sesuai tipe yang dipakai frontend:
     * assessment_done (ke admin) dan job_posted (ke student).
     */
    public function run(): void
    {
        AppNotification::updateOrCreate(
            [
                'target_role' => 'admin',
                'type' => 'assessment_done',
                'text' => 'Budi Santoso menyelesaikan asesmen dengan 16 skill dinilai',
            ],
            ['read_at' => null]
        );

        AppNotification::updateOrCreate(
            [
                'target_role' => 'student',
                'type' => 'job_posted',
                'text' => 'Lowongan baru: Frontend Developer Intern di TechCorp Indonesia',
            ],
            ['read_at' => null]
        );

        AppNotification::updateOrCreate(
            [
                'target_role' => 'student',
                'target_email' => 'budi@student.smk.id',
                'type' => 'job_posted',
                'text' => 'Lowongan baru: Backend Developer Intern di PT TechCorp Digital',
            ],
            ['read_at' => null]
        );
    }
}
