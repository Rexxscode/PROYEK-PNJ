<?php

namespace App\Http\Controllers;

use App\Services\PortfolioService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class PortfolioController extends Controller
{
    public function __construct(
        private PortfolioService $portfolio,
    ) {}

    public function projects(Request $request): JsonResponse
    {
        $data = $this->portfolio->projects($request->user()->id);

        return response()->json([
            'success' => true,
            'data' => $data['data'],
        ]);
    }

    public function save(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'skills' => 'nullable|array',
            'projectUrl' => 'nullable|string|url',
            'completedAt' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $this->portfolio->save($request->user()->id, $request->all());

        return response()->json([
            'success' => true,
            'message' => 'Project saved successfully',
            'data' => $data['data'],
        ]);
    }

    public function public(string $slug): JsonResponse
    {
        $data = $this->portfolio->publicBySlug($slug);

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }
}
