<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Skill extends Model
{
    // Removed use HasFactory - no factory file defined for Skill

    protected $fillable = [
        'name',
        'category',
        'level',
        'description',
    ];

    /**
     * The category of the skill (hard/soft).
     */
    public function category(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Skill::class);
    }

    /**
     * The students who have this skill.
     */
    public function students(): BelongsToMany
    {
        return $this->belongsToMany(Student::class, 'student_skills')
            ->withPivot('level')
            ->withTimestamps();
    }

    /**
     * The job skills (pivot).
     */
    public function jobs(): BelongsToMany
    {
        return $this->belongsToMany(Job::class, 'job_skills')
            ->withPivot('required_level')
            ->withTimestamps();
    }
}