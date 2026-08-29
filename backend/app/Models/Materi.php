<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Materi extends Model
{
    protected $table = 'materi';

    // Removed use HasFactory - no factory file defined for Materi

    protected $fillable = [
        'name',
        'description',
        'major_id',
    ];

    /**
     * The major this materi belongs to.
     */
    public function major(): BelongsTo
    {
        return $this->belongsTo(Major::class, 'major_id', 'short_code');
    }
}