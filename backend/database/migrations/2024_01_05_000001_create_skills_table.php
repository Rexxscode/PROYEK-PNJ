<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->enum('category', ['hard', 'soft']);
            $table->tinyInteger('level')->default(1);
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::table('skills', function (Blueprint $table) {
            $table->unique(['name', 'category']);
        });
    }

    public function down(): void
    {
        Schema::table('skills', function (Blueprint $table) {
            $table->dropUnique(['name', 'category']);
        });
        Schema::dropIfExists('skills');
    }
};