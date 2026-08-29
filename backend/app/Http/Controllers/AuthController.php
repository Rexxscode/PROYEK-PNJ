<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Student;
use App\Models\Industry;
use App\Models\Major;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials',
            ], 401);
        }

        // Check industry approval status
        if ($user->role === 'industry') {
            $industry = $user->industry;
            if ($industry && $industry->status !== 'approved') {
                return response()->json([
                    'success' => false,
                    'message' => 'Industry account not approved yet',
                ], 403);
            }
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'data' => [
                'token' => $token,
                'user' => $this->formatUserResponse($user),
            ],
        ]);
    }

    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:student,industry',
            'major' => 'required_if:role,student|string|exists:majors,short_code',
            'grade' => 'required_if:role,student|string',
            'company' => 'required_if:role,industry|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        if ($request->role === 'student') {
            $major = Major::where('short_code', $request->major)->firstOrFail();
            Student::create([
                'user_id' => $user->id,
                'major_id' => $major->short_code,
                'grade' => $request->grade,
            ]);
        } elseif ($request->role === 'industry') {
            Industry::create([
                'user_id' => $user->id,
                'company' => $request->company,
                'status' => 'pending',
            ]);
        }

        // Reload user with relationships for response
        $user->loadMissing(['student.major', 'industry']);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Registration successful',
            'data' => [
                'token' => $token,
                'user' => $this->formatUserResponse($user),
            ],
        ], 201);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully',
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'user' => $this->formatUserResponse($request->user()),
            ],
        ]);
    }

    private function formatUserResponse(User $user): array
    {
        $data = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'created_at' => $user->created_at?->toISOString(),
        ];

        if ($user->role === 'student' && $user->student) {
            $data['student'] = [
                'major' => $user->student->major?->short_code,
                'major_name' => $user->student->major?->name,
                'grade' => $user->student->grade,
            ];
        } elseif ($user->role === 'industry' && $user->industry) {
            $data['industry'] = [
                'company_name' => $user->industry->company,
                'status' => $user->industry->status,
            ];
        }

        return $data;
    }
}