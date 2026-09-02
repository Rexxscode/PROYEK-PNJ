<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Major extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'short_code',
        'name',
        'description',
    ];

    /**
     * The students for this major.
     */
    public function students(): HasMany
    {
        return $this->hasMany(Student::class, 'major_id', 'short_code');
    }

    /**
     * The assessment questions for this major.
     */
    public function assessmentQuestions(): HasMany
    {
        return $this->hasMany(AssessmentQuestion::class, 'major_id', 'short_code');
    }

    /**
     * The materi for this major.
     */
    public function materi(): HasMany
    {
        return $this->hasMany(Materi::class, 'major_id', 'short_code');
    }

    /**
     * The roadmap milestones for this major.
     */
    public function roadmapMilestones(): HasMany
    {
        return $this->hasMany(RoadmapMilestone::class, 'major_id', 'short_code');
    }
}