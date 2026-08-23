<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(['name', 'category'])]
class Skill extends Model
{
    /**
     * Siswa yang menilai skill ini melalui pivot student_skills.
     *
     * @return BelongsToMany<User, $this>
     */
    public function students(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'student_skills', 'skill_id', 'user_id')
            ->withPivot('level');
    }

    /**
     * @return HasMany<StudentSkill, $this>
     */
    public function studentSkills(): HasMany
    {
        return $this->hasMany(StudentSkill::class);
    }

    /**
     * Karier yang membutuhkan skill ini melalui pivot career_skill.
     *
     * @return BelongsToMany<Career, $this>
     */
    public function careers(): BelongsToMany
    {
        return $this->belongsToMany(Career::class, 'career_skill', 'skill_id', 'career_id')
            ->withPivot('required_level');
    }

    /**
     * Lowongan yang membutuhkan skill ini melalui pivot job_skill.
     *
     * @return BelongsToMany<Job, $this>
     */
    public function jobs(): BelongsToMany
    {
        return $this->belongsToMany(Job::class, 'job_skill', 'skill_id', 'job_id');
    }
}
