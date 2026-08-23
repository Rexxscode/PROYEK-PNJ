<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Catatan: nama tabel adalah `job_opportunities` (bukan `jobs`) karena
     * tabel `jobs` sudah dipakai oleh migration default Laravel untuk
     * database queue (0001_01_01_000002_create_jobs_table.php).
     */
    public function up(): void
    {
        Schema::create('job_opportunities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('posted_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('company', 100);
            $table->string('company_logo')->nullable();
            $table->string('title', 150);
            $table->enum('type', ['magang', 'fulltime', 'parttime', 'freelance'])->default('magang');
            $table->string('location', 100);
            $table->text('description');
            $table->string('salary', 100)->nullable();
            $table->date('deadline')->nullable();
            $table->timestamp('posted_at')->useCurrent();
            $table->timestamps();

            $table->index('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_opportunities');
    }
};
