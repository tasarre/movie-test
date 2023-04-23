// src/app/film.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from './models/film.model';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = '4a02cc526b7d61d997a8306e73da3c13';

  constructor(private http: HttpClient) { }

  getFilms(): Observable<{ results: Film[] }> {
    return this.http.get<{ results: Film[] }>(`${this.apiUrl}/discover/movie?api_key=${this.apiKey}&sort_by=popularity.desc&language=fr`);
  }
}
