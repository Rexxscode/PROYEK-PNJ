<?php

namespace App\Repositories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class StudentRepository extends Repository
{
    protected function model(): string
    {
        return Student::class;
    }

    public function findByNameSlug(string $slug): ?Student
    {
        $name = str_replace('-', ' ', $slug);

        return Student::query()
            ->with(['user', 'major'])
            ->whereHas('user', function ($q) use ($name) {
                $q->whereRaw('LOWER(name) = ?', [strtolower($name)]);
            })
            ->first();
    }

    public function findById(int $id): ?Student
    {
        // NB: callers pass the authenticated *user* id, not the student PK.
        // Resolve the student row belonging to that user.
        return Student::with(['user', 'major'])->where('user_id', $id)->first();
    }

    public function withRelations(): Collection
    {
        return Student::with(['user', 'major'])->get();
    }

    public function paginateWithRelations(int $perPage, string $search = '')
    {
        $query = Student::with(['user', 'major']);

        if ($search) {
            $query->whereHas('user', fn ($q) =>
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
            );
        }

        return $query->paginate($perPage);
    }

    public function findByEmail(string $email): ?Student
    {
        return Student::whereHas('user', fn ($q) => $q->where('email', $email))
            ->with('user')
            ->first();
    }

    public function findUserByEmail(string $email)
    {
        return \App\Models\User::where('email', $email)->first();
    }
}
