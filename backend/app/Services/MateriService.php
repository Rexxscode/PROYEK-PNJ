<?php

namespace App\Services;

use App\Models\Student;
use App\Repositories\CertificateRepository;
use App\Repositories\MateriRepository;
use App\Repositories\StudentRepository;
use Illuminate\Validation\ValidationException;

class MateriService
{
    public function __construct(
        private MateriRepository $materis,
        private CertificateRepository $certificates,
        private StudentRepository $students,
    ) {}

    public function listByMajor(string $major): array
    {
        $materiList = $this->materis->listByMajor($major);

        return [
            'data' => $materiList,
            'meta' => [
                'total' => $materiList->count(),
                'major_id' => $major,
            ],
        ];
    }

    public function questions($materiId): array
    {
        $materi = $this->materis->findById($materiId);

        if (!$materi) {
            throw ValidationException::withMessages([
                'materi' => 'Materi tidak ditemukan',
            ]);
        }

        $questions = $this->materis->questionsForMateri($materiId);

        // Never expose correct answers to students.
        $safe = $questions->map(fn ($q) => [
            'id' => $q->id,
            'materi_id' => $q->materi_id,
            'skill' => $q->skill_name,
            'question' => $q->question,
            'options' => $q->options,
            'difficulty' => $q->difficulty,
        ]);

        return [
            'data' => $safe,
            'meta' => [
                'total' => $questions->count(),
                'materi_id' => $materiId,
                'major_id' => $materi->major_id,
            ],
        ];
    }

    public function adminQuestions($materiId): array
    {
        $materi = $this->materis->findById($materiId);

        if (!$materi) {
            throw ValidationException::withMessages([
                'materi' => 'Materi tidak ditemukan',
            ]);
        }

        $questions = $this->materis->questionsForMateri($materiId);

        $full = $questions->map(fn ($q) => [
            'id' => $q->id,
            'materi_id' => $q->materi_id,
            'skill' => $q->skill_name,
            'question' => $q->question,
            'options' => $q->options,
            'correct' => $q->correct_index,
            'difficulty' => $q->difficulty,
        ]);

        return [
            'data' => $full,
            'meta' => [
                'total' => $questions->count(),
                'materi_id' => $materiId,
                'major_id' => $materi->major_id,
            ],
        ];
    }

    public function submit(int $userId, $materiId, array $answers): array
    {
        $materi = $this->materis->findById($materiId);

        if (!$materi) {
            throw ValidationException::withMessages([
                'materi' => 'Materi tidak ditemukan',
            ]);
        }

        $questions = $this->materis->questionsForMateri($materiId);

        if ($questions->isEmpty()) {
            throw ValidationException::withMessages([
                'questions' => 'No questions found for this materi',
            ]);
        }

        $validIds = $questions->pluck('id')->map(fn ($id) => (string) $id)->toArray();
        foreach (array_keys($answers) as $key) {
            if (!in_array($key, $validIds)) {
                throw ValidationException::withMessages([
                    'answers' => "Invalid question ID: {$key}",
                ]);
            }
        }

        $correctCount = 0;
        $answeredMap = [];

        foreach ($questions as $question) {
            $studentAnswer = data_get($answers, $question->id, null);
            $isCorrect = ($studentAnswer !== null && $studentAnswer == $question->correct_index);

            if ($isCorrect) {
                $correctCount++;
            }

            $answeredMap[$question->id] = [
                'selected_index' => $studentAnswer,
                'is_correct' => $isCorrect,
            ];
        }

        $totalQuestions = count($questions);
        $passThreshold = 0.8;
        $requiredCorrect = ceil($totalQuestions * $passThreshold);
        $scorePercentage = $totalQuestions > 0 ? round(($correctCount / $totalQuestions) * 100) : 0;
        $passed = $scorePercentage >= ($passThreshold * 100);

        $student = $this->students->findById($userId);

        if ($student) {
            $this->saveCertificate($student, $materiId, $materi->major_id, $correctCount, $totalQuestions, $passed);
        }

        return [
            'score' => $correctCount,
            'total' => $totalQuestions,
            'percentage' => $scorePercentage,
            'passed' => $passed,
            'required_correct' => $requiredCorrect,
            'materi_id' => $materiId,
            'answered' => $answeredMap,
        ];
    }

    private function saveCertificate(Student $student, $materiId, string $majorId, int $correctCount, int $totalQuestions, bool $passed): void
    {
        $certificate = $this->certificates->detailForStudent($student->id, $materiId)
            ?? $this->certificates->create([
                'student_id' => $student->id,
                'major_id' => $majorId,
                'materi_id' => $materiId,
                'score' => $correctCount,
                'total' => $totalQuestions,
                'passed' => $passed ? 1 : 0,
                'certificate_date' => $passed ? now() : null,
                'attempts' => 0,
            ]);

        $certificate->attempts += 1;
        $certificate->score = $correctCount;
        $certificate->passed = $passed ? 1 : 0;
        $certificate->certificate_date = $passed ? now() : null;
        $certificate->save();
    }

    public function adminUpdateQuestions($materiId, array $questions): array
    {
        $materi = $this->materis->findById($materiId);

        if (!$materi) {
            throw ValidationException::withMessages([
                'materi' => 'Materi tidak ditemukan',
            ]);
        }

        $this->materis->deleteQuestionsForMateri($materiId);

        foreach ($questions as $q) {
            $skillId = $q['skill_id'] ?? null;

            if ($skillId === null && !empty($q['skill'])) {
                $skill = \App\Models\Skill::where('name', $q['skill'])->first();
                $skillId = $skill?->id ?? null;
            }

            $this->materis->createQuestion([
                'materi_id' => $materiId,
                'skill_id' => $skillId,
                'question' => $q['question'],
                'options' => json_encode($q['options']),
                'correct_index' => $q['correct'],
                'difficulty' => $q['difficulty'] ?? 'basic',
            ]);
        }

        return [
            'materi_id' => $materiId,
            'total' => count($questions),
        ];
    }

    public function adminResetQuestions($materiId): array
    {
        $materi = $this->materis->findById($materiId);

        if (!$materi) {
            throw ValidationException::withMessages([
                'materi' => 'Materi tidak ditemukan',
            ]);
        }

        $this->materis->deleteQuestionsForMateri($materiId);

        (new \Database\Seeders\MateriQuestionSeeder())->run();

        return [
            'materi_id' => $materiId,
            'reset' => true,
        ];
    }
}
