<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class PeliculaController extends Controller
{
    // Mostrar todas las películas
    public function index()
    {
        return Movie::all();
    }

    // Mostrar una película específica
    public function show($id)
    {
        return Movie::find($id);
    }

    // Almacenar una nueva película
    public function store(Request $request)
    {
        // Validación
        $request->validate([
            'title' => 'required|string|max:255',
            'director' => 'nullable|string|max:255',
            'synopsis' => 'nullable|string',
            'cover' => 'nullable|file|mimes:jpg,jpeg,png,gif|max:2048',
            'year' => 'nullable|integer',
            'trailer_url' => 'nullable|url', // <-- Agregar validación del trailer
        ]);

        // Crear la película
        $movie = Movie::create($request->all());

        // Subida de archivo opcional
        if ($request->hasFile('cover')) {
            $file = $request->file('cover');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads'), $filename);
            $movie->cover = 'uploads/' . $filename;
            $movie->save(); // guardar cambios
        }

        return response()->json($movie, 201);
    }

    // Actualizar una película existente
    public function update(Request $request, $id)
    {
        $movie = Movie::findOrFail($id);

        // Validación
        $request->validate([
            'title' => 'required|string|max:255',
            'director' => 'nullable|string|max:255',
            'synopsis' => 'nullable|string',
            'cover' => 'nullable|file|mimes:jpg,jpeg,png,gif|max:2048', // 👈 cambiar a file
            'year' => 'nullable|integer',
            'trailer_url' => 'nullable|url', // <-- nuevo campo para trailer
        ]);

        // Actualizar campos
        $movie->title = $request->title;
        $movie->director = $request->director;
        $movie->synopsis = $request->synopsis;
        $movie->year = $request->year;
        $movie->trailer_url = $request->trailer_url; // <-- guardar trailer


        // Subida de archivo opcional
        if ($request->hasFile('cover')) {
            $file = $request->file('cover');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads'), $filename);
            $movie->cover = 'uploads/' . $filename;
        }

        $movie->save();

        return response()->json($movie, 200);
    }

    // Eliminar una película
    public function destroy($id)
    {
        Movie::destroy($id); // 👈 especificar la clase
        return response()->json(null, 204);
    }
}
