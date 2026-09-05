<?php

namespace App\Http\Controllers;

use App\Services\IndustryService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class IndustryController extends Controller
{
    public function __construct(
        private IndustryService $industry,
    ) {}

    public function me(Request $request): JsonResponse
    {
        $data = $this->industry->profileForUser($request->user()->id);

        return response()->json([
            'success' => true,
            'data' => $data['data'],
        ]);
    }

    public function profile(Request $request): JsonResponse
    {
        $data = $this->industry->profileForUser($request->user()->id);

        return response()->json([
            'success' => true,
            'data' => $data['data'],
        ]);
    }

    public function updateProfile(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'company' => 'required|string|max:255',
            'industry' => 'required|string',
            'location' => 'nullable|string',
            'website' => 'nullable|string|url',
            'description' => 'nullable|string',
            'founded' => 'nullable|string',
            'employee_count' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $this->industry->updateProfile($request->user()->id, $request->all());

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'data' => $data['data'],
        ]);
    }

    public function candidates(Request $request): JsonResponse
    {
        $skillFilter = $request->query('skills');

        $data = $this->industry->candidates($request->user()->id, $skillFilter);

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }
}
