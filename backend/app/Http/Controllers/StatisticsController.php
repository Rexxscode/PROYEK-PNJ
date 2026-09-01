<?php

namespace App\Http\Controllers;

use App\Services\StatisticsService;
use Illuminate\Http\JsonResponse;

class StatisticsController extends Controller
{
    public function __construct(
        private StatisticsService $statistics,
    ) {}

    public function dashboard(): JsonResponse
    {
        $data = $this->statistics->dashboard();

        return response()->json([
            'success' => true,
            'data' => $data['data'],
        ]);
    }

    public function readinessDistribution(): JsonResponse
    {
        $data = $this->statistics->readinessDistribution();

        return response()->json([
            'success' => true,
            'data' => $data['data'],
        ]);
    }
}
