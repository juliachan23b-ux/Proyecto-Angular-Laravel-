import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { MoviesComponent } from './components/movies/movies';
import { MovieComponent } from './components/movie/movie';
import { MovieAdd } from './components/movie-add/movie-add';
import { MovieEdit } from './components/movie-edit/movie-edit';



export const routes: Routes = [
  { path: '', component: IndexComponent },             // Página de inicio
  { path: 'movies', component: MoviesComponent },    // Catálogo de películas o movies?
  { path: 'movies/add', component: MovieAdd },        // Agregar película
  { path: 'movies/edit/:id', component: MovieEdit}, // Edita
  { path: 'movies/:id', component: MovieComponent }, // detalle de la pelicula
  
];
