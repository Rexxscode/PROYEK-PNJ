<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assessment_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
            $table->string('major_id', 10)->nullable();
            $table->foreign('major_id')
                ->references('short_code')
                ->on('majors')
                ->onDelete('set null')
                ->onUpdate('cascade');
            $table->smallInteger('score');
            $table->tinyInteger('level')->default(1);
            $table->json('skill_scores')->nullable();
            $table->timestamp('answered_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assessment_results');
    }
};