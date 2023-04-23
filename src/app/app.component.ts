import { Component, OnInit } from '@angular/core';
import { Film } from './models/film.model';
import { FilmService } from './film.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  films: Film[] = [];
  afficherLesFavoris = false;
  afficherLaWatchlist = false;

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.loadFilms();
  }
  
  loadFilms(): void {
    this.filmService.getFilms().subscribe((response) => {
      this.films = response.results.slice(0, 20);
    });
  }

  afficherFilms(): void {
    this.afficherLesFavoris = false;
    this.afficherLaWatchlist = false;
  }

  afficherFavoris(): void {
    this.afficherLesFavoris = true;
    this.afficherLaWatchlist = false;
  }

  afficherWatchlist(): void {
    this.afficherLesFavoris = false;
    this.afficherLaWatchlist = true;
  }
}
