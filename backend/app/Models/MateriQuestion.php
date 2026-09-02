<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MateriQuestion extends Model
{
    protected $table = 'materi_questions';

    protected $fillable = [
        'materi_id',
        'skill_id',
        'question',
        'options',
        'correct_index',
        'difficulty',
    ];

    protected $casts = [
        'options' => 'array',
    ];

    protected $appends = ['skill_name'];

    public function getSkillNameAttribute(): ?string
    {
        return $this->relationLoaded('skill') && $this->skill
            ? $this->skill->name
            : ($this->skill?->name ?? null);
    }

    /**     * The materi this question belongs to.
     */
    public function materi(): BelongsTo
    {
        return $this->belongsTo(Materi::class, 'materi_id');
    }

    /**     * The skill this question is associated with (optional).
     */
    public function skill(): BelongsTo
    {
        return $this->belongsTo(Skill::class, 'skill_id');
    }
}