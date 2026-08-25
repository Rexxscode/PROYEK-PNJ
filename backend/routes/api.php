<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\IndustryController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PublicPortfolioController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

// ===== Public =====
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::get('/portfolio/{slug}', [PublicPortfolioController::class, 'show']);

// ===== Jobs (token optional) =====
Route::get('/jobs', [JobController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::get('/auth/me', [AuthController::class, 'me']);

    // Students
    Route::get('/students', [StudentController::class, 'index'])->middleware('role:admin');
    Route::get('/students/{student}', [StudentController::class, 'show']);
    Route::put('/students/{student}', [StudentController::class, 'update']);
    Route::get('/students/{student}/portfolio', [StudentController::class, 'portfolio']);
    Route::post('/students/{student}/assessment', [StudentController::class, 'submitAssessment']);
    Route::get('/students/{student}/roadmap', [StudentController::class, 'roadmap']);
    Route::put('/students/{student}/roadmap/{milestone}', [StudentController::class, 'updateMilestone']);

    // Jobs (authenticated)
    Route::middleware('role:industry')->group(function () {
        Route::post('/jobs', [JobController::class, 'store']);
        Route::put('/jobs/{job}', [JobController::class, 'update'])->middleware('can:update,job');
        Route::delete('/jobs/{job}', [JobController::class, 'destroy'])->middleware('can:update,job');
    });

    // Industry
    Route::middleware('role:industry')->group(function () {
        Route::get('/industry/candidates', [IndustryController::class, 'candidates']);
        Route::get('/industry/stats', [IndustryController::class, 'stats']);
    });

    // Admin
    Route::middleware('role:admin')->group(function () {
        Route::get('/admin/stats', [AdminController::class, 'stats']);
        Route::get('/admin/students', [AdminController::class, 'students']);
        Route::get('/admin/notifications', [NotificationController::class, 'all']);
        Route::post('/notifications', [NotificationController::class, 'store']);
    });

    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::put('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
    Route::put('/notifications/{notification}/read', [NotificationController::class, 'markAsRead']);
});
