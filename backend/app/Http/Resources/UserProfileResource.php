<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Bentuk UserProfile sesuai kontrak frontend (app/lib/type.ts).
 */
class UserProfileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            'major' => $this->major,
            'grade' => $this->grade,
            'avatar' => $this->avatar ?? '',
            'createdAt' => $this->created_at?->toISOString(),
        ];
    }
}
