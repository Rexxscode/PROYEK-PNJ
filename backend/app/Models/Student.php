<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Student extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'major_id',
        'grade',
        'avatar',
        'student_card',
        'card_status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'grade' => 'string',
    ];

    protected $appends = ['name', 'slug'];

    public function getNameAttribute(): string
    {
        return $this->user->name ?? '';
    }

    public function getSlugAttribute(): string
    {
        return $this->user ? strtolower(str_replace(' ', '-', $this->user->name)) : '';
    }

    /**
     * The skills for the student (via pivot).
     */
    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class, 'student_skills')
            ->withPivot('level', 'achieved_at');
    }

    /**
     * The assessment results for the student.
     */
    public function assessmentResults(): HasMany
    {
        return $this->hasMany(AssessmentResult::class);
    }

    /**
     * The certificates for the student.
     */
    public function certificates(): HasMany
    {
        return $this->hasMany(Certificate::class);
    }

    /**
     * The projects for the student.
     */
    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    /**
     * The roadmap progress for the student.
     */
    public function roadmapProgress(): HasMany
    {
        return $this->hasMany(StudentRoadmapProgress::class);
    }

    /**
     * The user who owns this student profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * The major for this student.
     */
    public function major(): BelongsTo
    {
        return $this->belongsTo(Major::class, 'major_id', 'short_code');
    }
}