<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssessmentQuestion extends Model
{
    // Removed use HasFactory - no factory file defined for AssessmentQuestion

    protected $fillable = [
        'major_id',
        'question',
        'options',
        'correct',
        'difficulty',
        'skill',
    ];

    protected $casts = [
        'options' => 'array',
    ];
}