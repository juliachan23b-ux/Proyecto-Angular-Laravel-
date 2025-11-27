import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MoviesService, Movie } from '../../services/movies.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './movie.html',
  styleUrls: ['./movie.css']
})
export class MovieComponent implements OnInit {
  movie: Movie | null = null;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private router: Router, // ✅ Coma añadida
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.moviesService.getMovie(id).subscribe({
      next: (data: Movie) => {
        this.movie = data;
      },
      error: (err) => console.error('Error al cargar la película', err)
    });
  }

  // Función para convertir URL de YouTube a embebido seguro
  getEmbedUrl(url: string): SafeResourceUrl {
    const videoId = this.extractYoutubeId(url);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  private extractYoutubeId(url: string): string {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  }

  // 🔹 Regresar al catálogo
  backToCatalog(): void {
    this.router.navigate(['/movies']);
  }

  // 🔹 Editar película
  editMovie(id?: number): void {
    if (!id) return; 
    this.router.navigate(['/movies/edit', id]);
  }

  // 🔹 Eliminar película
  deleteMovie(id?: number): void {
    if (!id) return;
    const confirmDelete = confirm('¿Estás seguro de eliminar esta película?');
    if (confirmDelete) {
      this.moviesService.deleteMovie(id).subscribe({
        next: () => {
          alert('Película eliminada correctamente');
          this.router.navigate(['/movies']);
        },
        error: (err) => {
          console.error('Error al eliminar la película:', err);
          alert('Error al eliminar la película');
        }
      });
    }
  }
}
