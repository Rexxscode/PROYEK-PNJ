<?php

namespace App\Http\Controllers;

use App\Services\MateriService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class MateriController extends Controller
{
    public function __construct(
        private MateriService $materi,
    ) {}

    public function listByMajor(string $major): JsonResponse
    {
        $data = $this->materi->listByMajor($major);

        return response()->json([
            'success' => true,
            'data' => $data['data'],
            'meta' => $data['meta'],
        ]);
    }

    public function questions($materiId): JsonResponse
    {
        $data = $this->materi->questions($materiId);

        return response()->json([
            'success' => true,
            'data' => $data['data'],
            'meta' => $data['meta'],
        ]);
    }

    public function adminQuestions($materiId): JsonResponse
    {
        $data = $this->materi->adminQuestions($materiId);

        return response()->json([
            'success' => true,
            'data' => $data['data'],
            'meta' => $data['meta'],
        ]);
    }

    public function submit(Request $request, $materiId): JsonResponse
    {
        $validator = Validator::make($request->all(), [
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

        $result = $this->materi->submit($request->user()->id, $materiId, $request->input('answers'));

        return response()->json([
            'success' => true,
            'data' => $result,
            'message' => $result['passed'] ? 'Selamat! Anda lulus.' : 'Belum lulus, coba lagi.',
        ]);
    }

    public function updateQuestions(Request $request, $materiId): JsonResponse
    {
        $validator = Validator::make($request->only('questions'), [
            'questions' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $this->materi->adminUpdateQuestions($materiId, $request->input('questions'));

        return response()->json([
            'success' => true,
            'message' => 'Questions updated',
            'data' => $data,
        ]);
    }

    public function resetQuestions($materiId): JsonResponse
    {
        $data = $this->materi->adminResetQuestions($materiId);

        return response()->json([
            'success' => true,
            'message' => 'Questions reset to default',
            'data' => $data,
        ]);
    }
}
