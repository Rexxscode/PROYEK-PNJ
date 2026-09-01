<?php

namespace App\Http\Controllers;

use App\Models\Materi;
use App\Models\MateriQuestion;
use App\Models\Student;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class MateriController extends Controller
{
    public function listByMajor(string $major): JsonResponse
    {
        $materiList = Materi::where('major_id', $major)->get();

        return response()->json([
            'success' => true,
            'data' => $materiList,
            'meta' => [
                'total' => count($materiList),
                'major_id' => $major,
            ]
        ]);
    }

    public function questions(int|string $materiId): JsonResponse
    {
        $student = auth()->user();

        if (!$student) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 401);
        }

        $materi = Materi::where('id', $materiId)->first();

        if (!$materi) {
            return response()->json([
                'success' => false,
                'message' => 'Materi tidak ditemukan',
            ], 404);
        }

        $questions = MateriQuestion::where('materi_id', $materiId)->get();

        return response()->json([
            'success' => true,
            'data' => $questions,
            'meta' => [
                'total' => count($questions),
                'materi_id' => $materiId,
                'major_id' => $materi->major_id,
            ]
        ]);
    }

    public function submit(Request $request, int|string $materiId): JsonResponse
    {
        $student = auth()->user();

        if (!$student) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 401);
        }

        $materi = Materi::where('id', $materiId)->first();

        if (!$materi) {
            return response()->json([
                'success' => false,
                'message' => 'Materi tidak ditemukan',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'answers' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $answers = $request->answers;

        // Get questions for this materi
        $questions = MateriQuestion::where('materi_id', $materiId)->get();

        if ($questions->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No questions found for this materi',
            ], 404);
        }

        // Validate that all keys are valid question IDs for this materi
        $validIds = $questions->pluck('id')->map(fn($id) => (string) $id)->toArray();
        foreach (array_keys($answers) as $key) {
            if (!in_array($key, $validIds)) {
                return response()->json([
                    'success' => false,
                    'message' => "Invalid question ID: {$key}",
                ], 422);
            }
        }

        // Calculate score server-side
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
        $passThreshold = 0.8; // 80% passing threshold
        $requiredCorrect = ceil($totalQuestions * $passThreshold); // 16 of 20
        $scorePercentage = $totalQuestions > 0 ? round(($correctCount / $totalQuestions) * 100) : 0;
        $passed = $scorePercentage >= ($passThreshold * 100);

        // Update or create certificate
        $certificate = Certificate::firstOrCreate(
            ['student_id' => $student->id, 'materi_id' => $materiId],
            [
                'student_id' => $student->id,
                'major_id' => $materi->major_id,
                'materi_id' => $materiId,
                'score' => $correctCount,
                'total' => $totalQuestions,
                'passed' => $passed ? 1 : 0,
                'certificate_date' => $passed ? now() : null,
                'attempts' => 1,
            ]
        );

        // Increment attempts if already exists
        if ($certificate->exists) {
            $certificate->attempts += 1;
            $certificate->score = $correctCount;
            $certificate->passed = $passed ? 1 : 0;
            $certificate->certificate_date = $passed ? now() : null;
            $certificate->save();
        }

        return response()->json([
            'success' => true,
            'data' => [
                'score' => $correctCount,
                'total' => $totalQuestions,
                'percentage' => $scorePercentage,
                'passed' => $passed,
                'required_correct' => $requiredCorrect,
                'attempts' => $certificate->attempts,
                'materi_id' => $materiId,
                'answered' => $answeredMap,
            ],
            'message' => $passed ? 'Selamat! Anda lulus.' : 'Belum lulus, coba lagi.'
        ]);
    }
}