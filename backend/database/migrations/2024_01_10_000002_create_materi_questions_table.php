<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('materi_questions', function (Blueprint $table) {
            $table->id(); // auto-incrementing bigint
            $table->foreignId('materi_id', 20)->constrained('materi')->onDelete('cascade');
            $table->foreignId('skill_id', 20)->nullable()->constrained('skills')->onDelete('set null');
            $table->text('question');
            $table->json('options');
            $table->tinyInteger('correct_index');
            $table->enum('difficulty', ['basic', 'intermediate', 'advanced']);
            $table->timestamps();

            $table->unique(['materi_id', 'id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('materi_questions');
    }
};