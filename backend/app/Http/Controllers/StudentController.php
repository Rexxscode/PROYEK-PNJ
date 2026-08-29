<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        // Get all students with relationships
        $students = Student::with(['user', 'major'])
            ->when(request('only', []) ?? [], function ($query, $fields) {
                // Only select requested fields
                foreach ($fields as $field) {
                    $query->with($field);
                }
            })
            ->get();

        return response()->json([
            'success' => true,
            'data' => $students,
            'meta' => [
                'total' => $students->count(),
            ]
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $student = Student::with(['user', 'major'])
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $student,
        ]);
    }
}