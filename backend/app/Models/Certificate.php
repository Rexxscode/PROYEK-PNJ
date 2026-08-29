<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Certificate extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'major_id',
        'materi_id',
        'score',
        'total',
        'passed',
        'certificate_date',
        'attempts',
    ];

    /**
     * The student who earned this certificate.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    /**
     * The major for this certificate.
     */
    public function major(): BelongsTo
    {
        return $this->belongsTo(Major::class, 'major_id', 'short_code');
    }

    /**
     * The materi for this certificate.
     */
    public function materi(): BelongsTo
    {
        return $this->belongsTo(Materi::class, 'materi_id');
    }
}