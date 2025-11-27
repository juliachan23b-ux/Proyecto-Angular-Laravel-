<?php


use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['status' => 'Backend funcionando'];
});

// Ruta para servir la app Angular
Route::get('/angular/{any?}', function () {
    return view('angular'); // Blade que carga Angular
})->where('any', '.*');


