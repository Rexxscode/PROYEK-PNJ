<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class UserRepository extends Repository
{
    protected function model(): string
    {
        return User::class;
    }

    public function findByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }

    public function findByRole(string $role): \Illuminate\Database\Eloquent\Collection
    {
        return User::where('role', $role)->get();
    }

    public function createAdmin(array $data): User
    {
        return User::create($data);
    }

    public function allWithProfiles(): \Illuminate\Database\Eloquent\Collection
    {
        return User::with('student', 'industry')->latest()->get();
    }
}
