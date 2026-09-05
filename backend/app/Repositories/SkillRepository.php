<?php

namespace App\Repositories;

use App\Models\Skill;
use Illuminate\Database\Eloquent\Model;

class SkillRepository extends Repository
{
    protected function model(): string
    {
        return Skill::class;
    }

    public function findByName(string $name): ?Model
    {
        return Skill::where('name', $name)->first();
    }
}
