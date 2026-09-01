<?php

namespace App\Repositories;

use App\Models\Major;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class MajorRepository extends Repository
{
    protected function model(): string
    {
        return Major::class;
    }

    public function findByShortCode(string $shortCode): ?Model
    {
        return Major::where('short_code', $shortCode)->first();
    }
}
