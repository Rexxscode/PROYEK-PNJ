<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\StudentDataService;
use Illuminate\Http\JsonResponse;

class PublicPortfolioController extends Controller
{
    public function __construct(private readonly StudentDataService $data)
    {
    }

    /**
     * GET /api/portfolio/{slug} — PUBLIC, tanpa autentikasi.
     *
     * TIDAK mengembalikan: password, email, token, role, atau data internal lain.
     */
    public function show(string $slug): JsonResponse
    {
        $student = User::query()
            ->where('role', 'student')
            ->where('slug', $slug)
            ->first();

        if (! $student) {
            return response()->json([
                'message' => 'Portfolio tidak ditemukan',
            ], 404);
        }

        return response()->json($this->data->portfolio($student, public: true));
    }
}
