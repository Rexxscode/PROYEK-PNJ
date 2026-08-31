<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\Student;
use App\Models\Materi;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class CertificateController extends Controller
{
    public function list(): JsonResponse
    {
        $student = auth()->user();

        if (!$student) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 401);
        }

        $certificates = Certificate::where('student_id', $student->id)
            ->with(['materi', 'major'])
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $certificates,
            'meta' => [
                'total' => count($certificates),
            ]
        ]);
    }

    public function detail($materiId): JsonResponse
    {
        $student = auth()->user();

        if (!$student) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 401);
        }

        $certificate = Certificate::where('student_id', $student->id)
            ->where('materi_id', $materiId)
            ->first();

        if (!$certificate) {
            return response()->json([
                'success' => false,
                'message' => 'Certificate not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $certificate,
        ]);
    }
}