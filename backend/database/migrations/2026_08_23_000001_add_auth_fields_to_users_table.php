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
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['student', 'admin', 'industry'])->default('student');
            $table->string('major')->nullable();
            $table->string('grade', 10)->nullable();
            $table->string('avatar')->nullable();
            $table->string('slug')->nullable()->unique();
            $table->timestamp('assessed_at')->nullable();

            $table->index('role');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['role']);
            $table->dropUnique(['slug']);
            $table->dropColumn(['role', 'major', 'grade', 'avatar', 'slug', 'assessed_at']);
        });
    }
};
