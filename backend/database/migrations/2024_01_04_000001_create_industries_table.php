<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('industries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade')->unique();
            $table->string('company', 100);
            $table->enum('industry', [
                'Teknologi Informasi',
                'Telekomunikasi',
                'Design & Kreatif',
                'Manufacturing',
                'Financial Services',
                'E-Commerce',
                'Media & Entertainment',
                'Konsultan'
            ]);
            $table->string('location')->nullable();
            $table->string('website')->nullable();
            $table->char('founded', 4)->nullable();
            $table->enum('employee_count', ['1-10', '11-50', '51-200', '201-500', '500+'])->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('industries');
    }
};