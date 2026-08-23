<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password', 'role', 'major', 'grade', 'avatar', 'slug', 'assessed_at'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * @return HasMany<StudentSkill, $this>
     */
    public function studentSkills(): HasMany
    {
        return $this->hasMany(StudentSkill::class);
    }

    /**
     * Skill yang dinilai siswa melalui tabel pivot student_skills.
     *
     * @return BelongsToMany<Skill, $this>
     */
    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class, 'student_skills', 'user_id', 'skill_id')
            ->withPivot('level');
    }

    /**
     * @return HasMany<StudentCareerMatch, $this>
     */
    public function studentCareerMatches(): HasMany
    {
        return $this->hasMany(StudentCareerMatch::class);
    }

    /**
     * @return HasMany<RoadmapMilestone, $this>
     */
    public function roadmapMilestones(): HasMany
    {
        return $this->hasMany(RoadmapMilestone::class);
    }

    /**
     * @return HasMany<Project, $this>
     */
    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    /**
     * Lowongan yang diposting user ini (role industry).
     *
     * @return HasMany<Job, $this>
     */
    public function jobs(): HasMany
    {
        return $this->hasMany(Job::class, 'posted_by');
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'assessed_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
