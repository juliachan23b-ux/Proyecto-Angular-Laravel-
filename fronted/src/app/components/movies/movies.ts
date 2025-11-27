import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MoviesService, Movie } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movies.html',
  styleUrls: ['./movies.css'],
  encapsulation: ViewEncapsulation.None
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];

  constructor(
    private moviesService: MoviesService,
    private router: Router // <-- Inyectamos Router
  ) {}

  ngOnInit(): void {
    this.loadMovies(); // cargamos las películas al iniciar
  }

  // Método para cargar las películas
  loadMovies(): void {
    this.moviesService.getMovies().subscribe((data: Movie[]) => {
      this.movies = data;
    });
  }

  viewMovie(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/movies', id]);
    }
  }

  editMovie(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/movies/edit', id]);
    }
  }

  addMovie(): void {
    this.router.navigate(['/movies/add']);
  }

  deleteMovie(id: number | undefined): void {
    if (id !== undefined && confirm('¿Deseas eliminar esta película?')) {
      this.moviesService.deleteMovie(id).subscribe(() => {
        this.loadMovies(); // recarga la lista después de eliminar
      });
    }
  }
}
