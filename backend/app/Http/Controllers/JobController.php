<?php

namespace App\Http\Controllers;

use App\Services\JobService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class JobController extends Controller
{
    public function __construct(
        private JobService $job,
    ) {}

    public function index(Request $request): JsonResponse
    {
        $data = $this->job->publicList(
            $request->query('type'),
            $request->integer('page') ?: null,
            $request->integer('per_page') ?: null,
            (string) $request->query('search', '')
        );

        return response()->json([
            'success' => true,
            'data' => $data['data'],
            'meta' => $data['meta'] ?? [],
        ]);
    }

    public function show(string $id): JsonResponse
    {
        $data = $this->job->show($id);

        return response()->json([
            'success' => true,
            'data' => $data['data'],
        ]);
    }

    public function mine(Request $request): JsonResponse
    {
        $data = $this->job->mine($request->user()->id);

        return response()->json([
            'success' => true,
            'data' => $data['data'],
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'location' => 'required|string',
            'type' => 'required|in:magang,fulltime,parttime,freelance',
            'description' => 'required|string',
            'skills' => 'required|array',
            'deadline' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $this->job->store($request->user()->id, $request->all());

        return response()->json([
            'success' => true,
            'message' => 'Job posted successfully',
            'data' => $data['data'],
        ], 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'location' => 'sometimes|required|string',
            'type' => 'sometimes|required|in:magang,fulltime,parttime,freelance',
            'description' => 'sometimes|required|string',
            'skills' => 'sometimes|required|array',
            'deadline' => 'sometimes|nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $this->job->update($request->user()->id, $id, $request->all());

        return response()->json([
            'success' => true,
            'message' => 'Job updated successfully',
            'data' => $data['data'],
        ]);
    }

    public function delete(Request $request, string $id): JsonResponse
    {
        $this->job->delete($request->user()->id, $id);

        return response()->json([
            'success' => true,
            'message' => 'Job deleted successfully',
        ]);
    }
}
