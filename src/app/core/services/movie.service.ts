import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';
import { Movie } from '../models/movies.models';

@Injectable({providedIn: 'root'})
export class MoviesService {

  private apiUrl = 'https://api.themoviedb.org/3/movie';


  constructor(private http: HttpClient) { }

  getMoviesCurrentlyPlaying(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.access_token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/now_playing?language=fr&page=1&region=fr`, { headers })
  }

  getTopRatedMovies(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.access_token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/top_rated?language=fr&page=1`, { headers })
  }

  getPopularMovies(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.access_token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/popular?language=fr&page=1`, { headers })
  }

  getMovieById(movieId: string): Observable<Movie> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.access_token}`,
    });
    return this.http.get<Movie>(`${this.apiUrl}/${movieId}?language=fr`, { headers })
  }

  getCastOfAMovie(movieId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.access_token}`,
    });
    return this.http.get<Movie>(`${this.apiUrl}/${movieId}/credits?language=fr'`, { headers })
  }

}
