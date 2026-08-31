<?php

namespace App\Http\Controllers;

use App\Models\AssessmentQuestion;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class AssessmentController extends Controller
{
    public function questions($major = null): JsonResponse
    {
        $query = AssessmentQuestion::query();

        if ($major) {
            $query->where('major_id', $major);
        }

        $questions = $query->get();

        return response()->json([
            'success' => true,
            'data' => $questions,
            'meta' => [
                'total' => count($questions),
                'major' => $major ?? 'all'
            ]
        ]);
    }

    public function submit(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'major' => 'required|string|in:RPL,DKV,TKJ,TT',
            'answers' => 'required|array',
            'answers.*' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $major = $request->major;
        $answers = $request->answers;

        // Validate that answers correspond to questions for this major
        $totalQuestions = AssessmentQuestion::where('major_id', $major)->count();
        $answeredQuestions = count($answers);

        if ($answeredQuestions === 0 || $answeredQuestions > $totalQuestions) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid answers format',
            ], 422);
        }

        // Calculate score and results
        $questions = AssessmentQuestion::where('major_id', $major_id)->get();
        $correct = 0;
        $skillScores = [];
        $levelScores = [];

        foreach ($questions as $idx => $question) {
            $questionId = $question->id;
            if (isset($answers[$question->id])) {
                if ($answers[$question->id] == $question->correct) {
                    $correct++;
                }
            }
        }

        $score = $totalQuestions > 0 ? round(($correct / $totalQuestions) * 100) : 0;
        $level = $this->getLevel($score);

        // Calculate skill scores
        $skillScores = $this->calculateSkillScores($questions, $answers);

        // Save assessment result
        $student = auth()->user(); // authenticated user
        $result = $student->assessmentResults()->create([
            'major_id' => $major,
            'score' => $correct,
            'level' => $level,
            'skill_scores' => json_encode($skillScores),
            'answered_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'data' => [
                'score' => $correct,
                'total' => $totalQuestions,
                'percentage' => round(($correct / $totalQuestions) * 100),
                'level' => $level,
                'skill_scores' => $skillScores,
                'answered_at' => now(),
            ],
        ]);
    }

    private function getLevel($score): string
    {
        if ($score <= 20) return 'beginner';
        if ($score <= 40) return 'developing';
        if ($score <= 60) return 'intermediate';
        if ($score <= 80) return 'advanced';
        return 'expert';
    }

    private function calculateSkillScores($questions, $answers): array
    {
        $skillScores = [];

        foreach ($questions as $question) {
            $skill = $question->skill;
            if (!isset($skillScores[$skill])) {
                $skillScores[$skill] = [
                    'correct' => 0,
                    'total' => 0,
                    'level' => 'beginner'
                ];
            }

            $skillScores[$skill]['total']++;
            if (isset($answers[$question->id]) && $answers[$question->id] == $question->correct) {
                $skillScores[$skill]['correct']++;
            }
        }

        // Calculate levels per skill
        foreach ($skillScores as &$skill) {
            $percentage = $skill['total'] > 0 ? round(($skill['correct'] / $skill['total']) * 100) : 0;
            if ($skill['correct'] === 0) {
                $skill['level'] = 'beginner';
            } elseif ($skill['correct'] === $skill['total']) {
                $skill['level'] = 'expert';
            } elseif ($skill['correct'] >= $skill['total'] * 0.75) {
                $skill['level'] = 'advanced';
            } elseif ($skill['correct'] >= $skill['total'] * 0.5) {
                $skill['level'] = 'intermediate';
            } else {
                $skill['level'] = 'beginner';
            }
        }

        return $skillScores;
    }

    public function results(): JsonResponse
    {
        $student = auth()->user()->student;

        $results = $student->assessmentResults()
            ->latest()
            ->get(['id', 'major_id', 'score', 'level', 'skill_scores', 'answered_at']);

        return response()->json([
            'success' => true,
            'data' => $results
        ]);
    }
}