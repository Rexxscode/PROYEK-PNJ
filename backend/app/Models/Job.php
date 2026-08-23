<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(['posted_by', 'company', 'company_logo', 'title', 'type', 'location', 'description', 'salary', 'deadline', 'posted_at'])]
class Job extends Model
{
    /**
     * Tabel `job_opportunities` karena `jobs` dipakai queue bawaan Laravel.
     */
    protected $table = 'job_opportunities';

    /**
     * User industry yang memposting lowongan ini (kolom posted_by).
     *
     * @return BelongsTo<User, $this>
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'posted_by');
    }

    /**
     * Skill wajib lowongan ini melalui pivot job_skill.
     *
     * @return BelongsToMany<Skill, $this>
     */
    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class, 'job_skill', 'job_id', 'skill_id');
    }

    protected function casts(): array
    {
        return [
            'deadline' => 'date',
            'posted_at' => 'datetime',
        ];
    }
}
