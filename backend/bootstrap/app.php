<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

// Crear la aplicación
$app = Application::configure(basePath: dirname(__DIR__));

// Configurar rutas
$app->withRouting(
    web: __DIR__.'/../routes/web.php',
    api: __DIR__.'/../routes/api.php', // 👈 aquí se cargan tus rutas API
    commands: __DIR__.'/../routes/console.php',
    health: '/up',
);

// Configurar middleware
$app->withMiddleware(function (Middleware $middleware): void {
    // Middleware opcional
});

// Configurar excepciones
$app->withExceptions(function (Exceptions $exceptions): void {
    // Manejo de excepciones opcional
});

// Retornar la aplicación
return $app->create();
