import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService, Movie } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './movie-edit.html',
  styleUrls: ['./movie-edit.css'] 
})
export class MovieEdit implements OnInit {
  movieForm!: FormGroup;
  movieId!: number;

  previewImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));

    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      director: [''],
      synopsis: [''],
      cover: [''],
      year: [new Date().getFullYear(), Validators.required],
      trailer_url: [''], // <-- Agregar a
    });

    // Cargar película
    this.moviesService.getMovie(this.movieId).subscribe({
      next: (movie: Movie) => {
        this.movieForm.patchValue(movie);
        trailer_url: movie.trailer_url || '', // <-- Asegura que se cargue

        // Asignar URL completa para preview
        this.previewImage = movie.cover
          ? `http://127.0.0.1:8000/${movie.cover}`
          : null;
      },
      error: (err: any) => {
        console.error('Error al cargar la película:', err);
      }
    });
  }

  // Selección de archivo
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }


// Obtener URL de YouTube embebida y segura
getEmbedUrl(url: string): SafeResourceUrl | null {
  if (!url) return null;

  // Si ya es embed, devolver tal cual
  if (url.includes('youtube.com/embed')) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // Buscar el ID del video
  const regExp = /(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);

  if (match && match[1]) {
    const safeUrl = `https://www.youtube.com/embed/${match[1]}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(safeUrl);
  }

  return null; // si no es un link válido
}


  // Guardar cambios
  onSubmit(): void {
    if (this.movieForm.valid) {
      const formData = new FormData();
      formData.append('title', this.movieForm.value.title || '');
      formData.append('director', this.movieForm.value.director || '');
      formData.append('synopsis', this.movieForm.value.synopsis || '');
      formData.append('year', this.movieForm.value.year ? this.movieForm.value.year.toString() : '0');
      formData.append('trailer_url', this.movieForm.value.trailer_url || ''); // <-- Agregar aquí

      if (this.selectedFile) {
        formData.append('cover', this.selectedFile);
      }

      this.moviesService.updateMovieFormData(this.movieId, formData).subscribe({
        next: () => {
          alert('Película actualizada correctamente');
          this.router.navigate(['/movies']);
        },
        error: (err: any) => {
          console.error('Error al actualizar la película:', err);
          alert('Error al actualizar la película');
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/movies']);
  }
}
