<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserProfileResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = User::create([
            'name' => $request->validated('name'),
            'email' => $request->validated('email'),
            'password' => $request->validated('password'),
            'role' => 'student',
            'major' => $request->majorName(),
            'grade' => $request->gradeName(),
            'slug' => $this->uniqueSlug($request->validated('name')),
        ]);

        return response()->json([
            'token' => $user->createToken('auth')->plainTextToken,
            'user' => new UserProfileResource($user),
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', $request->validated('email'))->first();

        if (! $user || ! Hash::check($request->validated('password'), $user->password)) {
            return response()->json([
                'message' => 'Email atau password salah',
            ], 401);
        }

        return response()->json([
            'token' => $user->createToken('auth')->plainTextToken,
            'user' => new UserProfileResource($user),
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => new UserProfileResource($request->user()),
        ]);
    }

    /**
     * Slug portfolio publik dari nama; diberi suffix bila bentrok.
     */
    private function uniqueSlug(string $name): string
    {
        $base = Str::slug($name) ?: Str::lower(Str::random(8));
        $slug = $base;
        $attempt = 1;

        while (User::where('slug', $slug)->exists()) {
            $slug = $base.'-'.(++$attempt);
        }

        return $slug;
    }
}
