<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserProfileResource;
use App\Models\User;
use App\Services\StudentDataService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class StudentController extends Controller
{
    use AuthorizesRequests;

    public function __construct(private readonly StudentDataService $data)
    {
    }

    /**
     * GET /api/students — daftar semua siswa (admin).
     */
    public function index(): JsonResponse
    {
        $students = User::query()
            ->where('role', 'student')
            ->orderBy('name')
            ->get();

        return response()->json(UserProfileResource::collection($students)->resolve());
    }

    /**
     * GET /api/students/{id} — admin atau siswa itu sendiri.
     */
    public function show(User $student): JsonResponse
    {
        $this->authorize('view', $student);

        return response()->json($this->data->studentData($student));
    }

    /**
     * PUT /api/students/{id} — hanya pemilik akun.
     */
    public function update(Request $request, User $student): JsonResponse
    {
        $this->authorize('update', $student);

        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:100'],
            'major' => ['sometimes', 'string', 'max:100'],
            'grade' => ['sometimes', 'string', 'max:10'],
            'avatar' => ['sometimes', 'nullable', 'string', 'max:255'],
        ]);

        if (isset($validated['name']) && $validated['name'] !== $student->name) {
            $base = Str::slug($validated['name']) ?: Str::random(8);
            $slug = $base;
            $attempt = 1;
            while (User::where('slug', $slug)->where('id', '!=', $student->id)->exists()) {
                $slug = $base.'-'.(++$attempt);
            }
            $validated['slug'] = $slug;
        }

        $student->update($validated);

        return response()->json(new UserProfileResource($student->refresh()));
    }

    /**
     * GET /api/students/{id}/portfolio.
     */
    public function portfolio(User $student): JsonResponse
    {
        $this->authorize('view', $student);

        return response()->json($this->data->portfolio($student));
    }
}
