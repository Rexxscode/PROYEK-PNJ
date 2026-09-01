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

    public function major(): BelongsTo
    {
        return $this->belongsTo(Major::class, 'major_id', 'short_code');
    }

    public function resources(): HasMany
    {
        return $this->hasMany(RoadmapResource::class, 'milestone_id', 'id');
    }

    public function progress(): HasMany
    {
        return $this->hasMany(StudentRoadmapProgress::class, 'milestone_id', 'id');
    }
}