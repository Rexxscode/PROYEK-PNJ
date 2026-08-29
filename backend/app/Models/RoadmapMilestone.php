<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RoadmapMilestone extends Model
{
    // Removed use HasFactory - no factory file defined for RoadmapMilestone

    protected $fillable = [
        'title',
        'description',
        'level',
        'estimated_hours',
        'major_id',
    ];
}