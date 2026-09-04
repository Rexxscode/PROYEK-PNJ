<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckCardApproval
{
    /**
     * Ensure the authenticated student has an approved card.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated',
            ], 401);
        }

        if ($user->role !== 'student') {
            return $next($request);
        }

        $student = $user->student;

        if (!$student || $student->card_status !== 'approved') {
            return response()->json([
                'success' => false,
                'message' => 'Kartu pelajar belum disetujui. Silakan unggah kartu pelajar terlebih dahulu.',
            ], 403);
        }

        return $next($request);
    }
}
