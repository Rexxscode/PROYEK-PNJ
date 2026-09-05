<?php

namespace App\Http\Controllers;

use App\Services\MajorService;
use Illuminate\Http\JsonResponse;

class MajorController extends Controller
{
    public function __construct(
        private MajorService $major,
    ) {}

    public function list(): JsonResponse
    {
        $data = $this->major->list();

        return response()->json([
            'success' => true,
            'data' => $data['data'],
        ]);
    }

    public function materi(string $majorId): JsonResponse
    {
        $data = $this->major->materi($majorId);

        return response()->json([
            'success' => true,
            'data' => $data['data'],
        ]);
    }
}
