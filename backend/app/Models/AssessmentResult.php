<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AssessmentResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'major_id',
        'score',
        'level',
        'skill_scores',
        'answered_at',
    ];

    /**
     * The student who took this assessment.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    /**
     * The major for this assessment result.
     */
    public function major(): BelongsTo
    {
        return $this->belongsTo(Major::class, 'major_id', 'short_code');
    }

    /**
     * The certificates generated from this assessment result.
     */
    public function certificates(): HasMany
    {
        return $this->hasMany(Certificate::class, 'student_id');
    }
}