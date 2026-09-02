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
            (string) $request->query('search', ''),
            $this->studentId($request),
        );

        return response()->json([
            'success' => true,
            'data' => $data['data'],
            'meta' => $data['meta'] ?? [],
        ]);
    }

    public function show(Request $request, string $id): JsonResponse
    {
        $data = $this->job->show($id, $this->studentId($request));

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
            'salary' => 'nullable|string|max:255',
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
            'salary' => 'sometimes|nullable|string|max:255',
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

    public function apply(Request $request, string $id): JsonResponse
    {
        $student = $request->user()->student;

        if (!$student) {
            return response()->json([
                'success' => false,
                'message' => 'Student profile not found',
            ], 422);
        }

        $data = $this->job->apply($student->id, $id);

        return response()->json([
            'success' => true,
            'message' => 'Application submitted successfully',
            'data' => $data['data'],
        ], 201);
    }

    public function myApplications(Request $request): JsonResponse
    {
        $student = $request->user()->student;

        if (!$student) {
            return response()->json([
                'success' => false,
                'message' => 'Student profile not found',
            ], 422);
        }

        $data = $this->job->applicationsForStudent($student->id);

        return response()->json([
            'success' => true,
            'data' => $data['data'],
        ]);
    }

    public function jobApplicants(Request $request, string $id): JsonResponse
    {
        $data = $this->job->applicationsForJob($request->user()->id, $id);

        return response()->json([
            'success' => true,
            'data' => $data['data'],
            'job' => $data['job'],
        ]);
    }

    public function updateApplicationStatus(Request $request, string $id, string $applicationId): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,accepted,rejected',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $this->job->setApplicationStatus($request->user()->id, $id, $applicationId, $request->input('status'));

        return response()->json([
            'success' => true,
            'message' => 'Application status updated',
            'data' => $data['data'],
        ]);
    }

    private function studentId(Request $request): ?int
    {
        $user = $request->user();

        if ($user && $user->role === 'student' && $user->student) {
            return $user->student->id;
        }

        return null;
    }
}
