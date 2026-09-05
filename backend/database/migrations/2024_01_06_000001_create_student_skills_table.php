<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_skills', function (Blueprint $table) {
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
            $table->string('skill_id', 20)->constrained('skills')->onDelete('cascade');
            $table->tinyInteger('level')->default(1);
            $table->timestamp('achieved_at')->nullable();
            $table->primary(['student_id', 'skill_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('student_skills');
    }
};