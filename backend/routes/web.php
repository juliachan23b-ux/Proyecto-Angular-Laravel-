<?php


use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Ruta para servir la app Angular
Route::get('/angular/{any?}', function () {
    return view('angular'); // Blade que carga Angular
})->where('any', '.*');


