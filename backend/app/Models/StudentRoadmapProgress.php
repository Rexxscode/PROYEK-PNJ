<?php

namespace App\Models;

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