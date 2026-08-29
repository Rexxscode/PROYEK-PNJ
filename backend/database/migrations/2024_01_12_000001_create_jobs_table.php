<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('industry_id')->constrained('industries')->onDelete('cascade');
            $table->string('title', 100);
            $table->enum('type', ['magang', 'fulltime', 'parttime', 'freelance']);
            $table->string('location')->nullable();
            $table->text('description')->nullable();
            $table->smallInteger('match_percentage')->nullable();
            $table->timestamp('posted_at');
            $table->date('deadline')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};