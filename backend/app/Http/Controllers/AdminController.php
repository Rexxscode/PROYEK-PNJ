<?php

namespace App\Http\Controllers;

use App\Services\AdminService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function __construct(
        private AdminService $admin,
    ) {}

    public function listAdmins(): JsonResponse
    {
        $data = $this->admin->listAdmins();

        return response()->json([
            'success' => true,
            'data' => $data['data'],
        ]);
    }

    public function createAdmin(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $this->admin->createAdmin($request->only('name', 'email', 'password'));

        return response()->json([
            'success' => true,
            'message' => 'Admin created successfully',
            'data' => $data['data'],
        ], 201);
    }

    public function listIndustries(): JsonResponse
    {
        $data = $this->admin->listIndustries();

        return response()->json([
            'success' => true,
            'data' => $data['data'],
        ]);
    }

    public function setIndustryApproval(Request $request, string $email): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'action' => 'required|in:approve,reject',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $this->admin->setIndustryApproval($email, $request->input('action'));

        return response()->json([
            'success' => true,
            'message' => 'Industry ' . $data['status'] . ' successfully',
            'data' => $data,
        ]);
    }
}
