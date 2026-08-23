<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(['title', 'description', 'category'])]
class Career extends Model
{
    /**
     * Skill wajib karier ini melalui pivot career_skill.
     *
     * @return BelongsToMany<Skill, $this>
     */
    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class, 'career_skill', 'career_id', 'skill_id')
            ->withPivot('required_level');
    }

    /**
     * @return HasMany<StudentCareerMatch, $this>
     */
    public function studentCareerMatches(): HasMany
    {
        return $this->hasMany(StudentCareerMatch::class);
    }
}
