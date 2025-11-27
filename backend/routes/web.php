<?php

use Illuminate\Support\Facades\Route;

// Ruta raíz simple para probar que el backend funciona
Route::get('/', function () {
    return response()->json(['status' => 'Backend funcionando']);
});

// Rutas de Angular deshabilitadas temporalmente hasta que tengas la vista
// Route::get('/angular/{any?}', function () {
//     return view('angular');
// })->where('any', '.*');
