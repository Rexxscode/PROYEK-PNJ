<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class NotificationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        // Ambil notifications untuk role user ini
        $notifications = $this->getNotificationsFor($user->role, $user->email);

        return response()->json([
            'success' => true,
            'data' => $notifications,
        ]);
    }

    public function unreadCount(Request $request): JsonResponse
    {
        $user = $request->user();

        $count = $this->getUnreadCount($user->role, $user->email);

        return response()->json([
            'success' => true,
            'data' => [
                'count' => $count,
            ],
        ]);
    }

    public function markRead(Request $request, string $id): JsonResponse
    {
        $user = $request->user();

        $this->markAsRead($id);

        return response()->json([
            'success' => true,
            'message' => 'Notification marked as read',
        ]);
    }

    public function markAllRead(Request $request): JsonResponse
    {
        $user = $request->user();

        $this->markAllAsRead($user->role, $user->email);

        return response()->json([
            'success' => true,
            'message' => 'All notifications marked as read',
        ]);
    }

    private function getNotificationsFor(string $role, ?string $email): array
    {
        $storageKey = 'app_notifications';
        $all = [];

        if (file_exists(storage_path("framework/{$storageKey}"))) {
            $content = file_get_contents(storage_path("framework/{$storageKey}"));
            $all = json_decode($content, true) ?? [];
        }

        $filtered = array_filter($all, function ($n) use ($role, $email) {
            if ($n['targetRole'] !== $role) return false;
            if ($n['targetEmail'] && $email && $n['targetEmail'] !== $email) return false;
            return true;
        });

        // Sort by createdAt descending
        usort($filtered, function ($a, $b) {
            return ($b['createdAt'] ?? 0) - ($a['createdAt'] ?? 0);
        });

        return array_values($filtered);
    }

    private function getUnreadCount(string $role, ?string $email): int
    {
        $notifications = $this->getNotificationsFor($role, $email);
        $count = 0;

        foreach ($notifications as $n) {
            if (!$n['read']) {
                $count++;
            }
        }

        return $count;
    }

    private function markAsRead(string $id): void
    {
        $storageKey = 'app_notifications';
        $all = [];

        if (file_exists(storage_path("framework/{$storageKey}"))) {
            $content = file_get_contents(storage_path("framework/{$storageKey}"));
            $all = json_decode($content, true) ?? [];
        }

        foreach ($all as &$n) {
            if ($n['id'] === $id) {
                $n['read'] = true;
                $n['read_at'] = time();
                break;
            }
        }

        file_put_contents(storage_path("framework/{$storageKey}"), json_encode($all));
    }

    private function markAllAsRead(string $role, ?string $email): void
    {
        $storageKey = 'app_notifications';
        $all = [];

        if (file_exists(storage_path("framework/{$storageKey}"))) {
            $content = file_get_contents(storage_path("framework/{$storageKey}"));
            $all = json_decode($content, true) ?? [];
        }

        foreach ($all as &$n) {
            if ($n['targetRole'] === $role && (!$n['targetEmail'] || $n['targetEmail'] === $email)) {
                $n['read'] = true;
                $n['read_at'] = time();
            }
        }

        file_put_contents(storage_path("framework/{$storageKey}"), json_encode($all));
    }
}