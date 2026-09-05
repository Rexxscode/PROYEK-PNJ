<?php

namespace App\Repositories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class PortfolioRepository extends Repository
{
    protected function model(): string
    {
        return Project::class;
    }

    public function projectsForStudent(int $studentId): Collection
    {
        return Project::where('student_id', $studentId)->get();
    }

    public function createForStudent(int $studentId, array $data): Model
    {
        $data['student_id'] = $studentId;

        return Project::create($data);
    }
}
