<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RoadmapResource extends Model
{
    // Removed use HasFactory - no factory file defined for RoadmapResource

    protected $fillable = [
        'milestone_id',
        'title',
        'url',
        'type',
        'description',
    ];

    public function milestone(): BelongsTo
    {
        return $this->belongsTo(RoadmapMilestone::class, 'milestone_id', 'id');
    }
}