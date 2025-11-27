<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    protected $table = 'movies'; // nombre exacto de tu tabla

    // Permitir asignación masiva de todos los campos
    protected $fillable = [
        'title',
        'director',
        'synopsis',
        'cover',
        'year',
        'trailer_url',
    ];

    public $timestamps = false; // si no tienes created_at / updated_at
}

