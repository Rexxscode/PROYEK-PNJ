<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('roadmap_resources', function (Blueprint $table) {
            $table->id();
            $table->string('milestone_id', 20)->index();
            $table->string('title', 100);
            $table->string('url', 255);
            $table->enum('type', ['article', 'video', 'course', 'practice']);
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('roadmap_resources');
    }
};