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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->enum('target_role', ['student', 'admin', 'industry']);
            $table->string('target_email', 150)->nullable();
            $table->string('type', 50);
            $table->text('text');
            $table->timestamp('read_at')->nullable();
            $table->timestamps();

            $table->index('target_role');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
