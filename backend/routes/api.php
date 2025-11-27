<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PeliculaController;

// Rutas API para películas
Route::get('/movies', [PeliculaController::class, 'index']);
Route::get('/movies/{id}', [PeliculaController::class, 'show']);
Route::post('/movies', [PeliculaController::class, 'store']);
Route::put('/movies/{id}', [PeliculaController::class, 'update']);
Route::delete('/movies/{id}', [PeliculaController::class, 'destroy']);
