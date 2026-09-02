<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Job extends Model
{
    use HasFactory;

    protected $table = 'job_opportunities';

    protected $fillable = [
        'industry_id',
        'title',
        'type',
        'location',
        'description',
        'match_percentage',
        'posted_at',
        'deadline',
        'salary',
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
            ->withPivot('required_level');
    }

    /**
     * The applications received for this job.
     */
    public function applications(): HasMany
    {
        return $this->hasMany(JobApplication::class, 'job_id');
    }
}