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
        $notifications = $this->notifications->forUser($userId);

        return [
            'data' => $notifications->map(fn ($n) => [
                'id' => (string) $n->id,
                'role' => $n->role,
                'target_email' => $n->target_email,
                'text' => $n->message ?: $n->title,
                'type' => $n->type,
                'read' => (bool) $n->read,
                'created_at' => $n->created_at?->toISOString(),
            ])->values(),
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

    public function create(array $data, int $userId): array
    {
        $recipients = collect();

        if (!empty($data['target_email'])) {
            $recipients = $this->users->findByEmail($data['target_email'])
                ? collect([$this->users->findByEmail($data['target_email'])])
                : collect();
        } elseif (!empty($data['role'])) {
            $recipients = $this->users->findByRole($data['role']);
        }

        $created = 0;
        foreach ($recipients as $user) {
            $this->notifications->create([
                'user_id' => $user->id,
                'role' => $data['role'] ?? $user->role,
                'target_email' => $data['target_email'] ?? null,
                'title' => $data['title'] ?? 'Notifikasi baru',
                'message' => $data['message'] ?? $data['text'] ?? '',
                'type' => $data['type'] ?? 'general',
                'read' => false,
            ]);
            $created++;
        }

        return [
            'created' => $created,
            'actor_id' => $userId,
        ];
    }
}
