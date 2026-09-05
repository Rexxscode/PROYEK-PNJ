<?php

namespace App\Http\Controllers;

use App\Services\RoadmapService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class RoadmapController extends Controller
{
    public function __construct(
        private RoadmapService $roadmap,
    ) {}

    public function index(Request $request): JsonResponse
    {
        $score = (int) $request->query('score', 0);

        $data = $this->roadmap->index($request->user()->id, $score);

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public function progress(Request $request): JsonResponse
    {
        $milestoneId = $request->query('milestone_id');

        $data = $this->roadmap->progress($request->user()->id, $milestoneId);

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public function updateProgress(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'milestone_id' => 'required|string',
            'status' => 'required|in:not_started,in_progress,completed',
            'resources_viewed' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $this->roadmap->updateProgress(
            $request->user()->id,
            $request->only('milestone_id', 'status', 'resources_viewed')
        );

        return response()->json([
            'success' => true,
            'message' => 'Progress updated successfully',
            'data' => $data,
        ]);
    }
}
