<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_roadmap_progress', function (Blueprint $table) {
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
            $table->string('milestone_id', 20)->index();
            $table->enum('status', ['not_started', 'in_progress', 'completed'])->default('not_started');
            $table->json('resources_viewed')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->primary(['student_id', 'milestone_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('student_roadmap_progress');
    }
};