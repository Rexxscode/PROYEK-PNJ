<?php

namespace Database\Seeders;

use App\Models\Major;
use App\Models\Skill;
use App\Models\Materi;
use App\Models\AssessmentQuestion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            MajorSeeder::class,
            SkillSeeder::class,
            MateriSeeder::class,
            AssessmentQuestionSeeder::class,
            RoadmapSeeder::class,
            UserSeeder::class,
        ]);
    }
}