<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'industry_id',
        'title',
        'type',
        'location',
        'description',
        'match_percentage',
        'posted_at',
        'deadline',
    ];

    /**
     * The industry that posted this job.
     */
    public function industry(): BelongsTo
    {
        return $this->belongsTo(Industry::class, 'industry_id');
    }

    /**
     * The skills required for this job.
     */
    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class, 'job_skills')
            ->withPivot('required_level')
            ->withTimestamps();
    }
}