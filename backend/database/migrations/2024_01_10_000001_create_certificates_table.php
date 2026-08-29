<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
            $table->foreignId('major_id', 10)->constrained('majors', 'short_code')->onDelete('set null');
            $table->foreignId('materi_id')->constrained('materi')->onDelete('cascade');
            $table->smallInteger('score');
            $table->smallInteger('total')->default(20);
            $table->tinyInteger('passed')->default(0);
            $table->date('certificate_date')->nullable();
            $table->tinyInteger('attempts')->default(1);
            $table->timestamps();

            $table->unique(['student_id', 'materi_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};