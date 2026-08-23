<?php

namespace App\Policies;

use App\Models\User;

/**
 * Aturan akses data siswa:
 * - view   : admin boleh melihat semua; siswa hanya dirinya sendiri.
 * - update : hanya pemilik akun (siswa itu sendiri).
 */
class StudentPolicy
{
    public function view(User $user, User $student): bool
    {
        return $user->role === 'admin' || $user->id === $student->id;
    }

    public function update(User $user, User $student): bool
    {
        return $user->id === $student->id;
    }
}
