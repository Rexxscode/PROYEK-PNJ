<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade')->unique();
            $table->string('major_id', 10)->nullable();
            $table->foreign('major_id')
                ->references('short_code')
                ->on('majors')
                ->onDelete('set null')
                ->onUpdate('cascade');
            $table->enum('grade', ['X', 'XI', 'XII', 'Alumni'])->nullable();
            $table->string('avatar')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};