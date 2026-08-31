<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assessment_questions', function (Blueprint $table) {
            $table->id();
            $table->string('major_id', 10)->nullable();
            $table->foreign('major_id')
                ->references('short_code')
                ->on('majors')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->string('question');
            $table->json('options');
            $table->integer('correct');
            $table->enum('difficulty', ['basic', 'intermediate', 'advanced', 'expert']);
            $table->string('skill');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assessment_questions');
    }
};