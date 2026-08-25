<?php

namespace App\Http\Controllers;

use App\Models\AppNotification;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * GET /api/notifications — hanya milik role user ini,
     * plus yang ditujukan ke email-nya (bila di-set).
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $notifications = $this->visibleQuery($user)
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (AppNotification $n) => $this->format($n))
            ->values()
            ->all();

        return response()->json($notifications);
    }

    /**
     * GET /api/admin/notifications — semua notifikasi untuk halaman admin.
     */
    public function all(): JsonResponse
    {
        $notifications = AppNotification::query()
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (AppNotification $n) => $this->format($n))
            ->values()
            ->all();

        return response()->json($notifications);
    }

    /**
     * POST /api/notifications — admin broadcast/target.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'text' => ['required', 'string', 'max:500'],
            'type' => ['required', 'string', 'max:50'],
            'targetRole' => ['required', 'in:student,admin,industry'],
            'targetEmail' => ['nullable', 'email'],
        ]);

        $notification = AppNotification::create([
            'text' => $validated['text'],
            'type' => $validated['type'],
            'target_role' => $validated['targetRole'],
            'target_email' => $validated['targetEmail'] ?? null,
        ]);

        return response()->json(['success' => true, 'id' => $notification->id], 201);
    }

    /**
     * PUT /api/notifications/{id}/read — idempotent.
     */
    public function markAsRead(Request $request, AppNotification $notification): JsonResponse
    {
        $visible = $this->visibleQuery($request->user())
            ->where('notifications.id', $notification->id)
            ->exists();

        if (! $visible) {
            abort(404);
        }

        if ($notification->read_at === null) {
            $notification->update(['read_at' => now()]);
        }

        return response()->json(['success' => true]);
    }

    /**
     * PUT /api/notifications/read-all.
     */
    public function markAllAsRead(Request $request): JsonResponse
    {
        $this->visibleQuery($request->user())
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        return response()->json(['success' => true]);
    }

    private function visibleQuery(User $user): Builder
    {
        return AppNotification::query()
            ->where('target_role', $user->role)
            ->where(fn (Builder $q) => $q->whereNull('target_email')->orWhere('target_email', $user->email));
    }

    private function format(AppNotification $n): array
    {
        return [
            'id' => $n->id,
            'text' => $n->text,
            'time' => $n->created_at?->diffForHumans(),
            'read' => $n->read_at !== null,
            'createdAt' => $n->created_at?->toISOString(),
            'type' => $n->type,
            'targetRole' => $n->target_role,
            'targetEmail' => $n->target_email,
        ];
    }
}
