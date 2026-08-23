<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['target_role', 'target_email', 'type', 'text', 'read_at'])]
class AppNotification extends Model
{
    /**
     * Custom table name to avoid clashing with Illuminate's database notifications.
     */
    protected $table = 'notifications';

    protected function casts(): array
    {
        return [
            'read_at' => 'datetime',
        ];
    }
}
