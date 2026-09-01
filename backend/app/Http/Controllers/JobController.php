<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Industry;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class JobController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $typeFilter = $request->query('type');

        $query = Job::with('industry', 'skills');

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
                    'company' => $job->industry->company ?? 'Unknown',
                    'location' => $job->location,
                    'type' => $job->type,
                    'description' => $job->description,
                    'skills' => $job->skills->pluck('name')->toArray(),
                    'matchPercentage' => $job->match_percentage ?? 0,
                    'postedAt' => $job->posted_at,
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

        $industry = $user->industry;
        if (!$industry) {
            return response()->json([
                'success' => false,
                'message' => 'Industry profile not found',
            ], 404);
        }

        $jobs = Job::where('industry_id', $industry->id)->with('skills')->get();

        return response()->json([
            'success' => true,
            'data' => $jobs->map(function ($job) {
                return [
                    'id' => $job->id,
                    'title' => $job->title,
                    'location' => $job->location,
                    'type' => $job->type,
                    'description' => $job->description,
                    'skills' => $job->skills->pluck('name')->toArray(),
                    'matchPercentage' => $job->match_percentage ?? 0,
                    'postedAt' => $job->posted_at,
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

        $industry = $user->industry;
        if (!$industry) {
            return response()->json([
                'success' => false,
                'message' => 'Industry profile not found',
            ], 404);
        }

        $job = Job::create([
            'industry_id' => $industry->id,
            'title' => $request->post('title'),
            'location' => $request->post('location'),
            'type' => $request->post('type'),
            'description' => $request->post('description'),
            'match_percentage' => 0,
            'posted_at' => now(),
            'deadline' => $request->post('deadline'),
        ]);

        $skillNames = $request->post('skills', []);
        foreach ($skillNames as $skillName) {
            $skill = \App\Models\Skill::where('name', $skillName)->first();
            if ($skill) {
                $job->skills()->attach($skill->id, ['required_level' => 1]);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Job created successfully',
            'data' => [
                'id' => $job->id,
                'title' => $job->title,
                'location' => $job->location,
                'type' => $job->type,
                'description' => $job->description,
                'skills' => $job->skills->pluck('name')->toArray(),
                'matchPercentage' => $job->match_percentage ?? 0,
                'postedAt' => $job->posted_at,
                'deadline' => $job->deadline,
            ],
        ]);
    }

    public function show(string $id): JsonResponse
    {
        $job = Job::with('industry', 'skills')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $job->id,
                'title' => $job->title,
                'company' => $job->industry->company ?? 'Unknown',
                'location' => $job->location,
                'type' => $job->type,
                'description' => $job->description,
                'skills' => $job->skills->pluck('name')->toArray(),
                'matchPercentage' => $job->match_percentage ?? 0,
                'postedAt' => $job->posted_at,
                'deadline' => $job->deadline,
            ],
        ]);
    }
}
