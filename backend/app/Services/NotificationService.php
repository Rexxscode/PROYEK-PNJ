<?php

namespace App\Services;

use App\Repositories\NotificationRepository;
use App\Repositories\UserRepository;
use Illuminate\Validation\ValidationException;

class NotificationService
{
    public function __construct(
        private NotificationRepository $notifications,
        private UserRepository $users,
    ) {}

    public function index(int $userId): array
    {
        return [
            'data' => $this->notifications->forUser($userId),
        ];
    }

    public function unreadCount(int $userId): array
    {
        return [
            'count' => $this->notifications->unreadCountForUser($userId),
        ];
    }

    public function markRead(int $userId, string $id): void
    {
        $notification = $this->notifications->findForUser($userId, $id);

        if (!$notification) {
            throw ValidationException::withMessages([
                'notification' => 'Notification not found',
            ]);
        }

        $this->notifications->markAsRead($notification);
    }

    public function markAllRead(int $userId): void
    {
        $this->notifications->markAllAsReadForUser($userId);
    }
}
