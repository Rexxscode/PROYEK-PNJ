<?php

namespace App\Http\Controllers;

use App\Services\CertificateService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CertificateController extends Controller
{
    public function __construct(
        private CertificateService $certificate,
    ) {}

    public function list(Request $request): JsonResponse
    {
        $data = $this->certificate->list($request->user()->id);

        return response()->json([
            'success' => true,
            'data' => $data['data'],
            'meta' => $data['meta'] ?? [],
        ]);
    }

    public function detail(Request $request, $materiId): JsonResponse
    {
        $data = $this->certificate->detail($request->user()->id, $materiId);

        return response()->json([
            'success' => true,
            'data' => $data['data'],
        ]);
    }
}
