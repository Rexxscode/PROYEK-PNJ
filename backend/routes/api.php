<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AssessmentController;

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
    Route::post('submit', [AssessmentController::class, 'submit']);
    Route::get('results', [AssessmentController::class, 'results']);
});