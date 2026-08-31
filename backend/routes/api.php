<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AssessmentController;
use App\Http\Controllers\MateriController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\RoadmapController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\IndustryController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\NotificationController;

Route::prefix('v1/auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [AuthController::class, 'me']);
    });
});

Route::prefix('v1/students')->group(function () {
    Route::get('', [StudentController::class, 'index']);
    Route::get('{slug}', [StudentController::class, 'show']);
});

Route::prefix('v1/assessment')->group(function () {
    Route::get('questions/{major?}', [AssessmentController::class, 'questions']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('submit', [AssessmentController::class, 'submit']);
        Route::get('results', [AssessmentController::class, 'results']);
    });
});

Route::prefix('v1/materi')->group(function () {
    Route::get('majors/{major}', [MateriController::class, 'listByMajor']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('{materiId}/questions', [MateriController::class, 'questions']);
        Route::post('{materiId}/submit', [MateriController::class, 'submit']);
    });
});

Route::prefix('v1/certificates')->middleware('auth:sanctum')->group(function () {
    Route::get('', [CertificateController::class, 'list']);
    Route::get('{materiId}', [CertificateController::class, 'detail']);
});

Route::prefix('v1/roadmap')->group(function () {
    Route::get('', [RoadmapController::class, 'index']);
    Route::get('progress', [RoadmapController::class, 'progress']);
    Route::post('progress', [RoadmapController::class, 'updateProgress']);
});

Route::prefix('v1/portfolios')->group(function () {
    Route::get('{email}/projects', [PortfolioController::class, 'projects']);
    Route::post('', [PortfolioController::class, 'save']);
});

Route::prefix('v1/portfolios/public')->group(function () {
    Route::get('{slug}', [PortfolioController::class, 'public']);
});

Route::prefix('v1/industries')->group(function () {
    Route::get('me', [IndustryController::class, 'me']);
    Route::put('profile', [IndustryController::class, 'profile']);
    Route::patch('profile', [IndustryController::class, 'updateProfile']);
    Route::get('candidates', [IndustryController::class, 'candidates']);
    Route::post('jobs', [IndustryController::class, 'createJob']);
    Route::get('jobs/mine', [IndustryController::class, 'jobs']);
    Route::put('jobs/{id}', [IndustryController::class, 'updateJob']);
    Route::delete('jobs/{id}', [IndustryController::class, 'deleteJob']);
});

Route::prefix('v1/jobs')->group(function () {
    Route::get('', [JobController::class, 'index']);
    Route::get('mine', [JobController::class, 'mine']);
    Route::post('', [JobController::class, 'store']);
    Route::get('{id}', [JobController::class, 'show']);
});

Route::prefix('v1/notifications')->group(function () {
    Route::get('', [NotificationController::class, 'index']);
    Route::get('unread-count', [NotificationController::class, 'unreadCount']);
    Route::post('{id}/read', [NotificationController::class, 'markRead']);
    Route::post('read-all', [NotificationController::class, 'markAllRead']);
});