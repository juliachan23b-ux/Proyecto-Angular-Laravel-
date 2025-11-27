import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesService, Movie } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './movie-add.html',
  styleUrls: ['./movie-add.css']  
})
export class MovieAdd implements OnInit {
  movieForm!: FormGroup;

  previewImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private moviesService: MoviesService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      director: [''],
      synopsis: [''],
      cover: [''],
      year: [new Date().getFullYear(), Validators.required],
      trailer_url: [''],
    });
  }

  // Preview del trailer
  getEmbedUrl(url: string): SafeResourceUrl {
    if (!url) return '';
    const embedUrl = url.replace('watch?v=', 'embed/');
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  // Selección de archivo para portada
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

  // Guardar película
  onSubmit(): void {
    if (this.movieForm.invalid) return;

    // Crear FormData
    const formData = new FormData();
    formData.append('title', this.movieForm.value.title);
    formData.append('director', this.movieForm.value.director || '');
    formData.append('synopsis', this.movieForm.value.synopsis || '');
    formData.append('year', this.movieForm.value.year.toString());
    formData.append('trailer_url', this.movieForm.value.trailer_url || '');
    
    if (this.selectedFile) {
      formData.append('cover', this.selectedFile);
    }

    // Llamar a servicio con FormData
    this.moviesService.addMovieFormData(formData).subscribe({
      next: (res) => {
        alert('Película agregada correctamente');
        this.movieForm.reset({ year: new Date().getFullYear() });
        this.previewImage = null;
        this.selectedFile = null;
        this.router.navigate(['/movies']);
      },
      error: (err) => {
        console.error('Error al agregar película:', err);
        alert('Error al agregar película');
      }
    });
  }

  cancel(): void {
    this.movieForm.reset({ year: new Date().getFullYear() });
    this.previewImage = null;
    this.selectedFile = null;
    this.router.navigate(['/movies']);
  }
}
