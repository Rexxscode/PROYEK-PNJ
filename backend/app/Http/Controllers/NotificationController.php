<?php

namespace App\Http\Controllers;

use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class NotificationController extends Controller
{
    public function __construct(
        private NotificationService $notification,
    ) {}

    public function index(Request $request): JsonResponse
    {
        $data = $this->notification->index($request->user()->id);

        return response()->json([
            'success' => true,
            'data' => $data['data'],
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'text' => 'required|string|max:500',
            'type' => 'required|string|max:50',
            'role' => 'nullable|string|in:student,industry,admin',
            'target_email' => 'nullable|string|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $this->notification->create($request->all(), $request->user()->id);

        return response()->json([
            'success' => true,
            'message' => 'Notification created',
            'data' => $data,
        ]);
    }

    public function unreadCount(Request $request): JsonResponse
    {
        $data = $this->notification->unreadCount($request->user()->id);

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public function markRead(Request $request, string $id): JsonResponse
    {
        $this->notification->markRead($request->user()->id, $id);

        return response()->json([
            'success' => true,
            'message' => 'Notification marked as read',
        ]);
    }

    public function markAllRead(Request $request): JsonResponse
    {
        $this->notification->markAllRead($request->user()->id);

        return response()->json([
            'success' => true,
            'message' => 'All notifications marked as read',
        ]);
    }
}
