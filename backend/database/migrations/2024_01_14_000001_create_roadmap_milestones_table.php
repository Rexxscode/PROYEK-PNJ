<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('roadmap_milestones', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->foreignId('major_id', 10)->constrained('majors', 'short_code')->onDelete('set null');
            $table->string('title', 100);
            $table->text('description')->nullable();
            $table->enum('level', ['fundamental', 'intermediate', 'advanced']);
            $table->smallInteger('estimated_hours')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('roadmap_milestones');
    }
};