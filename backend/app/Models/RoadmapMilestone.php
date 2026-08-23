<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['user_id', 'title', 'description', 'status', 'estimated_hours', 'sequence', 'skills', 'resources'])]
class RoadmapMilestone extends Model
{
    protected function casts(): array
    {
        return [
            'skills' => 'array',
            'resources' => 'array',
        ];
    }
}
