<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['posted_by', 'company', 'company_logo', 'title', 'type', 'location', 'description', 'salary', 'deadline', 'posted_at'])]
class Job extends Model
{
    /**
     * Tabel `job_opportunities` karena `jobs` dipakai queue bawaan Laravel.
     */
    protected $table = 'job_opportunities';

    protected function casts(): array
    {
        return [
            'deadline' => 'date',
            'posted_at' => 'datetime',
        ];
    }
}
