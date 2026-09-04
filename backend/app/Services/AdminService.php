<?php

namespace App\Services;

use App\Repositories\IndustryRepository;
use App\Repositories\UserRepository;
use App\Services\NotificationService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AdminService
{
    public function __construct(
        private UserRepository $users,
        private IndustryRepository $industries,
        private NotificationService $notifications,
    ) {}

    public function listAdmins(): array
    {
        return [
            'data' => $this->users->findByRole('admin')->map(fn ($u) => [
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'role' => $u->role,
            ]),
        ];
    }

    public function createAdmin(array $data): array
    {
        $admin = $this->users->createAdmin([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => 'admin',
        ]);

        return [
            'data' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'email' => $admin->email,
                'role' => $admin->role,
            ],
        ];
    }

    public function listIndustries(): array
    {
        $industries = $this->industries->all();

        return [
            'data' => $industries->map(function ($industry) {
                return [
                    'id' => $industry->id,
                    'email' => $industry->user?->email,
                    'name' => $industry->user?->name,
                    'company' => $industry->company,
                    'status' => $industry->status,
                ];
            }),
        ];
    }

    public function setIndustryApproval(string $email, string $action): array
    {
        $user = $this->users->findByEmail($email);

        if (!$user || $user->role !== 'industry') {
            throw ValidationException::withMessages([
                'email' => 'Industry account not found',
            ]);
        }

        $industry = $user->industry;

        if (!$industry) {
            throw ValidationException::withMessages([
                'email' => 'Industry profile not found',
            ]);
        }

        $this->industries->update($industry, [
            'status' => $action === 'reject' ? 'rejected' : 'approved',
        ]);

        $status = $action === 'reject' ? 'rejected' : 'approved';
        $this->notifications->create([
            'target_email' => $email,
            'role' => 'industry',
            'title' => $status === 'approved' ? 'Akun Perusahaan Disetujui' : 'Akun Perusahaan Ditolak',
            'message' => $status === 'approved'
                ? 'Akun perusahaan kamu telah disetujui! Kamu bisa login dan mulai mencari talenta.'
                : 'Pendaftaran akun perusahaan kamu ditolak oleh admin.',
            'type' => 'registration',
        ], 0);

        return [
            'email' => $email,
            'status' => $status,
        ];
    }
}
