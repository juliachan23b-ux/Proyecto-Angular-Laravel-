import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movie {
  id?: number;
  title: string;
  director?: string;
  synopsis?: string;
  cover?: string;
  year?: number;
  trailer_url?: string; // <-- Agrega 
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
 private apiUrl = 'http://127.0.0.1:8000/api/movies';


  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva película
  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie);
  }

  // Actualizar una película existente
  updateMovie(id: number, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/${id}`, movie);
  }

  // Eliminar una película
  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ✅ Nuevo método para enviar FormData al backend (con imagen incluida)
  addMovieFormData(formData: FormData): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, formData);
  }

   // Actualizar película con FormData (imagen incluida) usando POST + _method=PUT
  updateMovieFormData(id: number, formData: FormData): Observable<Movie> {
    formData.append('_method', 'PUT'); // Esto evita el error 422 con multipart/form-data
    return this.http.post<Movie>(`${this.apiUrl}/${id}`, formData);
  }
}