<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('roadmap_milestones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('title', 150);
            $table->text('description')->nullable();
            $table->enum('status', ['locked', 'available', 'in_progress', 'completed'])->default('locked');
            $table->unsignedSmallInteger('estimated_hours')->default(0);
            $table->unsignedSmallInteger('sequence')->default(0);
            $table->json('skills')->nullable();
            $table->json('resources')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'sequence']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roadmap_milestones');
    }
};
