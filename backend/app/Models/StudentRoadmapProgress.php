<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentRoadmapProgress extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'milestone_id',
        'status',
        'resources_viewed',
        'completed_at',
    ];

    protected $casts = [
        'resources_viewed' => 'array',
        'completed_at' => 'datetime',
    ];

    /**
     * The student for this progress record.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    /**
     * The milestone for this progress record.
     */
    public function milestone(): BelongsTo
    {
        return $this->belongsTo(RoadmapMilestone::class, 'milestone_id');
    }
}