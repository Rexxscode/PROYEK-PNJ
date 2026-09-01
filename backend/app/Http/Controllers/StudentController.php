<?php

namespace App\Http\Controllers;

use App\Services\StudentService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class StudentController extends Controller
{
    public function __construct(
        private StudentService $student,
    ) {}

    public function index(Request $request): JsonResponse
    {
        $data = $this->student->index(
            $request->integer('page') ?: null,
            $request->integer('per_page') ?: null,
            (string) $request->query('search', '')
        );

        return response()->json([
            'success' => true,
            'data' => $data['data'],
            'meta' => $data['meta'],
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $data = $this->student->show($slug);

        return response()->json([
            'success' => true,
            'data' => $data['data'],
        ]);
    }

    public function updateGrade(Request $request, string $email): JsonResponse
    {
        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'grade' => 'required|string|in:X,XI,XII,Alumni',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $this->student->updateGrade($email, $request->input('grade'));

        return response()->json([
            'success' => true,
            'message' => 'Grade updated successfully',
            'data' => $data,
        ]);
    }

    public function updateAvatar(Request $request): JsonResponse
    {
        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'avatar' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $this->student->updateAvatar($request->user()->id, $request->file('avatar'));

        return response()->json([
            'success' => true,
            'message' => 'Avatar updated successfully',
            'data' => $data,
        ]);
    }
}
