<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\HasMany;

class Industry extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company',
        'industry',
        'location',
        'website',
        'founded',
        'employee_count',
        'status',
    ];

    /**
     * The user who owns this industry profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * The jobs for this industry.
     */
    public function jobs(): HasMany
    {
        return $this->hasMany(Job::class, 'industry_id');
    }
}