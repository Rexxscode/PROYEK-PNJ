<?php

namespace App\Repositories;

use App\Models\Notification;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class NotificationRepository extends Repository
{
    protected function model(): string
    {
        return Notification::class;
    }

    public function forUser(int $userId): Collection
    {
        return Notification::where('user_id', $userId)
            ->latest()
            ->get();
    }

    public function unreadCountForUser(int $userId): int
    {
        return Notification::where('user_id', $userId)
            ->where('read', false)
            ->count();
    }

    public function findForUser(int $userId, $id): ?Notification
    {
        return Notification::where('id', $id)
            ->where('user_id', $userId)
            ->first();
    }

    public function markAsRead(Notification $notification): void
    {
        $notification->update([
            'read' => true,
            'read_at' => now(),
        ]);
    }

    public function markAllAsReadForUser(int $userId): void
    {
        Notification::where('user_id', $userId)
            ->where('read', false)
            ->update([
                'read' => true,
                'read_at' => now(),
            ]);
    }
}
