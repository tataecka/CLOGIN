<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ModuleController;

Route::post('/login', [AuthController::class, 'login']);
Route::get('/companies', [AuthController::class, 'getCompanies']); // 👈 moved here

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/modules', [ModuleController::class, 'index']);
    Route::get('/user', fn (Request $r) => $r->user());
});