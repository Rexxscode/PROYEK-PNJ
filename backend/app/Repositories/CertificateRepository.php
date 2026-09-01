<?php

namespace App\Repositories;

use App\Models\Certificate;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class CertificateRepository extends Repository
{
    protected function model(): string
    {
        return Certificate::class;
    }

    public function listForStudent(int $studentId): Collection
    {
        return Certificate::where('student_id', $studentId)
            ->with(['materi', 'major'])
            ->latest()
            ->get();
    }

    public function detailForStudent(int $studentId, $materiId): ?Certificate
    {
        return Certificate::where('student_id', $studentId)
            ->where('materi_id', $materiId)
            ->first();
    }
}
