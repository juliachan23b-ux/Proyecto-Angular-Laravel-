<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePeliculasTable extends Migration
{
    public function up()
    {
        Schema::table('movies', function (Blueprint $table) {
            $table->text('synopsis')->nullable()->after('director');
            $table->string('cover')->nullable()->after('synopsis');
            $table->integer('year')->nullable()->after('cover');
        });
    }

    public function down()
    {
        Schema::table('movies', function (Blueprint $table) {
            $table->dropColumn(['synopsis', 'cover', 'year']);
        });
    }
}
