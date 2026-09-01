<?php

namespace App\Services;

use App\Repositories\StudentRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class StudentService
{
    public function __construct(
        private StudentRepository $students,
    ) {}

    public function index(?int $page, ?int $perPage, string $search = ''): array
    {
        if ($page) {
            $perPage = $perPage ?: 15;
            $paginated = $this->students->paginateWithRelations($perPage, $search);

            return [
                'data' => $paginated->items(),
                'meta' => [
                    'total' => $paginated->total(),
                    'per_page' => $paginated->perPage(),
                    'current_page' => $paginated->currentPage(),
                    'last_page' => $paginated->lastPage(),
                ],
            ];
        }

        $students = $this->students->withRelations();

        return [
            'data' => $students,
            'meta' => ['total' => $students->count()],
        ];
    }

    public function show(string $slug): array
    {
        $student = $this->students->findByNameSlug($slug);

        if (!$student) {
            throw ValidationException::withMessages([
                'student' => 'Student not found',
            ]);
        }

        return [
            'data' => $student,
        ];
    }

    public function updateGrade(string $email, string $grade): array
    {
        $student = $this->students->findByEmail($email);

        if (!$student) {
            throw ValidationException::withMessages([
                'student' => 'Student not found',
            ]);
        }

        $this->students->update($student, ['grade' => $grade]);

        return [
            'email' => $email,
            'grade' => $grade,
        ];
    }

    public function updateAvatar(int $userId, UploadedFile $avatar): array
    {
        $student = $this->students->findById($userId);

        if (!$student) {
            throw ValidationException::withMessages([
                'student' => 'Student profile not found',
            ]);
        }

        $path = $avatar->store('avatars', 'public');

        $this->students->update($student, [
            'avatar' => $avatar->hashName(),
        ]);

        return [
            'avatar' => '/storage/' . $path,
        ];
    }
}
