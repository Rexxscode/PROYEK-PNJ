<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['user_id', 'title', 'description', 'image_url', 'project_url', 'completed_at', 'skills'])]
class Project extends Model
{
    protected function casts(): array
    {
        return [
            'completed_at' => 'date',
            'skills' => 'array',
        ];
    }
}
