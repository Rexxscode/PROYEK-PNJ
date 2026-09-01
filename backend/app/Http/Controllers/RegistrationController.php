<?php

namespace App\Http\Controllers;

use App\Services\RegistrationService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class RegistrationController extends Controller
{
    public function __construct(
        private RegistrationService $registration,
    ) {}

    public function listStudents(): JsonResponse
    {
        $data = $this->registration->listStudents();

        return response()->json([
            'success' => true,
            'data' => $data['data'],
        ]);
    }

    public function approve(string $email): JsonResponse
    {
        $data = $this->registration->approveCard($email);

        return response()->json([
            'success' => true,
            'message' => 'Student card approved',
            'data' => $data,
        ]);
    }

    public function reject(string $email): JsonResponse
    {
        $data = $this->registration->rejectCard($email);

        return response()->json([
            'success' => true,
            'message' => 'Student card rejected',
            'data' => $data,
        ]);
    }

    public function uploadCard(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'studentCard' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $this->registration->uploadCard($request->user()->id, $request->input('studentCard'));

        return response()->json([
            'success' => true,
            'message' => 'Student card uploaded',
            'data' => $data,
        ]);
    }
}
