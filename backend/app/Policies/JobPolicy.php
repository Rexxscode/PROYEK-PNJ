<?php

namespace App\Policies;

use App\Models\Job;
use App\Models\User;

/**
 * Lowongan hanya boleh dikelola oleh user industry yang mempostingnya.
 */
class JobPolicy
{
    public function update(User $user, Job $job): bool
    {
        return $user->id === $job->posted_by;
    }
}
