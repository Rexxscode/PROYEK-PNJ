<?php

namespace App\Services;

use App\Repositories\CertificateRepository;
use App\Repositories\StudentRepository;
use Illuminate\Validation\ValidationException;

class CertificateService
{
    public function __construct(
        private CertificateRepository $certificates,
        private StudentRepository $students,
    ) {}

    public function list(int $userId): array
    {
        $student = $this->students->findById($userId);

        if (!$student) {
            throw ValidationException::withMessages([
                'student' => 'Student profile not found',
            ]);
        }

        $certificates = $this->certificates->listForStudent($student->id);

        return [
            'data' => $certificates,
            'meta' => ['total' => $certificates->count()],
        ];
    }

    public function detail(int $userId, $materiId): array
    {
        $student = $this->students->findById($userId);

        if (!$student) {
            throw ValidationException::withMessages([
                'student' => 'Student profile not found',
            ]);
        }

        $certificate = $this->certificates->detailForStudent($student->id, $materiId);

        if (!$certificate) {
            throw ValidationException::withMessages([
                'certificate' => 'Certificate not found',
            ]);
        }

        return ['data' => $certificate];
    }
}
