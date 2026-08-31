<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class JobController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index(Request $request): JsonResponse
    {
        $typeFilter = $request->query('type');

        $query = Job::query();

        if ($typeFilter) {
            $query->where('type', $typeFilter);
        }

        $jobs = $query->get();

        return response()->json([
            'success' => true,
            'data' => $jobs->map(function ($job) {
                return [
                    'id' => $job->id,
                    'title' => $job->title,
                    'company' => $job->company ?? 'Unknown',
                    'location' => $job->location,
                    'type' => $job->type,
                    'description' => $job->description,
                    'skills' => $job->skills ? json_decode($job->skills, true) : [],
                    'matchPercentage' => $job->match_percentage ?? 0,
                    'postedAt' => $job->created_at,
                    'deadline' => $job->deadline,
                ];
            }),
        ]);
    }

    public function mine(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->role !== 'industry') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: industry account required',
            ], 403);
        }

        $jobs = Job::where('user_id', $user->id)->get();

        return response()->json([
            'success' => true,
            'data' => $jobs->map(function ($job) {
                return [
                    'id' => $job->id,
                    'title' => $job->title,
                    'company' => $job->company ?? 'Unknown',
                    'location' => $job->location,
                    'type' => $job->type,
                    'description' => $job->description,
                    'skills' => $job->skills ? json_decode($job->skills, true) : [],
                    'matchPercentage' => $job->match_percentage ?? 0,
                    'postedAt' => $job->created_at,
                    'deadline' => $job->deadline,
                ];
            }),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->role !== 'industry') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: industry account required',
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
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

        $job = Job::create([
            'user_id' => $user->id,
            'title' => $request->post('title'),
            'company' => $request->post('company'),
            'location' => $request->post('location'),
            'type' => $request->post('type'),
            'description' => $request->post('description'),
            'skills' => json_encode($request->post('skills')),
            'match_percentage' => 0,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Job created successfully',
            'data' => [
                'id' => $job->id,
                'title' => $job->title,
                'company' => $job->company,
                'location' => $job->location,
                'type' => $job->type,
                'description' => $job->description,
                'skills' => json_decode($job->skills, true) ?? [],
                'matchPercentage' => $job->match_percentage ?? 0,
                'postedAt' => $job->created_at,
                'deadline' => $job->deadline,
            ],
        ]);
    }

    public function show(string $id): JsonResponse
    {
        $job = Job::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $job->id,
                'title' => $job->title,
                'company' => $job->company ?? 'Unknown',
                'location' => $job->location,
                'type' => $job->type,
                'description' => $job->description,
                'skills' => $job->skills ? json_decode($job->skills, true) : [],
                'matchPercentage' => $job->match_percentage ?? 0,
                'postedAt' => $job->created_at,
                'deadline' => $job->deadline,
            ],
        ]);
    }
}