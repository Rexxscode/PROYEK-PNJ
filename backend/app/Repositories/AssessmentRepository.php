<?php

namespace App\Repositories;

use App\Models\AssessmentQuestion;
use App\Models\AssessmentResult;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class AssessmentRepository extends Repository
{
    protected function model(): string
    {
        return AssessmentQuestion::class;
    }

    public function questions(string $major = null): Collection
    {
        $query = AssessmentQuestion::query();

        if ($major) {
            $query->where('major_id', $major);
        }

        return $query->select('id', 'major_id', 'question', 'options', 'difficulty', 'skill')->get();
    }

    public function adminQuestions(string $major = null): Collection
    {
        $query = AssessmentQuestion::query()->select('id', 'major_id', 'question', 'options', 'correct', 'difficulty', 'skill');

        if ($major) {
            $query->where('major_id', $major);
        }

        return $query->get();
    }

    public function questionsForMajor(string $major): Collection
    {
        return AssessmentQuestion::where('major_id', $major)->get();
    }

    public function countForMajor(string $major): int
    {
        return AssessmentQuestion::where('major_id', $major)->count();
    }

    public function saveResult(array $data): Model
    {
        return AssessmentResult::create($data);
    }

    public function resultsForStudent(int $studentId): Collection
    {
        return AssessmentResult::where('student_id', $studentId)
            ->latest()
            ->get(['id', 'major_id', 'score', 'level', 'skill_scores', 'answered_at']);
    }
}
