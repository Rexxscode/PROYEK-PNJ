<?php

namespace App\Services;

use App\Repositories\StudentRepository;
use Illuminate\Validation\ValidationException;

class RegistrationService
{
    public function __construct(
        private StudentRepository $students,
    ) {}

    public function listStudents(): array
    {
        $students = $this->students->withRelations();

        return [
            'data' => $students->map(fn ($student) => [
                'id' => $student->id,
                'name' => $student->user?->name,
                'email' => $student->user?->email,
                'major' => $student->major_id,
                'major_name' => $student->major?->name,
                'grade' => $student->grade,
                'studentCard' => $student->student_card,
                'cardStatus' => $student->card_status ?? 'none',
            ]),
        ];
    }

    public function approveCard(string $email): array
    {
        $student = $this->requireStudentByEmail($email);

        $this->students->update($student, ['card_status' => 'approved']);

        return ['email' => $email, 'cardStatus' => 'approved'];
    }

    public function rejectCard(string $email): array
    {
        $student = $this->requireStudentByEmail($email);

        $this->students->update($student, [
            'card_status' => 'none',
            'student_card' => null,
        ]);

        return ['email' => $email, 'cardStatus' => 'none'];
    }

    public function uploadCard(int $userId, ?string $cardData): array
    {
        $student = $this->students->findById($userId);

        if (!$student) {
            throw ValidationException::withMessages([
                'student' => 'Student profile not found',
            ]);
        }

        if (!is_string($cardData) || !preg_match('/^data:(image\/[a-zA-Z]+);base64,(.+)$/', $cardData, $matches)) {
            throw ValidationException::withMessages([
                'studentCard' => 'Kartu pelajar harus berupa file gambar',
            ]);
        }

        $allowedMimes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        if (!in_array(strtolower($matches[1]), $allowedMimes, true)) {
            throw ValidationException::withMessages([
                'studentCard' => 'Format gambar tidak didukung (jpeg, png, webp)',
            ]);
        }

        $decoded = base64_decode($matches[2], true);
        if ($decoded === false || strlen($decoded) === 0 || strlen($decoded) > 2 * 1024 * 1024) {
            throw ValidationException::withMessages([
                'studentCard' => 'Gambar tidak valid atau melebihi 2MB',
            ]);
        }

        $this->students->update($student, [
            'student_card' => $cardData,
            'card_status' => 'pending',
        ]);

        return [
            'cardStatus' => 'pending',
        ];
    }

    private function requireStudentByEmail(string $email)
    {
        $user = $this->students->findUserByEmail($email);

        if (!$user || $user->role !== 'student') {
            throw ValidationException::withMessages([
                'email' => 'Student account not found',
            ]);
        }

        $student = $user->student;

        if (!$student) {
            throw ValidationException::withMessages([
                'email' => 'Student profile not found',
            ]);
        }

        return $student;
    }
}
