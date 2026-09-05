<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->enum('role', ['student', 'admin', 'industry']);
            $table->string('target_email')->nullable();
            $table->string('title', 100);
            $table->text('message');
            $table->enum('type', ['assessment_done', 'materi_passed', 'roadmap_update', 'system']);
            $table->tinyInteger('read')->default(0);
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};