import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilmService } from '../film.service';
import { FavorisService } from '../favoris.service';
import { Film } from '../models/film.model';
import { WatchlistService } from '../watchlist.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
})
export class FilmListComponent implements OnInit {
  @Input() films: Film[] = [];
  filmsOriginaux: Film[] = [];
  afficherFavoris = false;
  message: string;
 
  constructor(
    private filmService: FilmService,
    private favorisService: FavorisService,
    public watchlistService: WatchlistService
  ) {
    this.message = '';
  }

  ngOnInit(): void {
    this.loadFilms();
  }


  loadFilms(): void {
    this.filmService.getFilms().subscribe((response) => {
      this.films = response.results.slice(0, 20);
    });
  }

  ajouterAuxFavoris(film: Film): void {
    this.favorisService.ajouterAuxFavoris(film);
    this.message = `Le film ${film.title} a été ajouté aux favoris.`;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  supprimerDesFavoris(film: Film): void {
    this.favorisService.supprimerDesFavoris(film);
    this.message = `Le film ${film.title} a été supprimé aux favoris.`;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  estDansFavoris(film: Film): boolean {
    return this.favorisService.estDansFavoris(film);
  }
  trierParDate(): void {
    this.films.sort(
      (a, b) =>
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
    );
  }

  trierParNote(): void {
    this.films.sort((a, b) => b.vote_average - a.vote_average);
  }
  toggleAfficherFavoris(): void {
    this.afficherFavoris = !this.afficherFavoris;
    if (this.afficherFavoris) {
      this.films = this.films.filter((film) =>
        this.favorisService.estDansFavoris(film)
      );
    } else {
      this.films = [...this.filmsOriginaux];
    }
  }

  ajouterAWatchlist(film: Film): void {
    this.watchlistService.addFilm(film);
  }

  supprimerDeWatchlist(film: Film): void {
    this.watchlistService.removeFilm(film);
    this.message = `Le film ${film.title} a été supprimé pour plus tard.`;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  estDansWatchlist(film: Film): boolean {
    return this.watchlistService.isFilmInWatchlist(film);
  }
  ajouterALaListeDeVisionnage(film: Film): void {
    this.watchlistService.addFilm(film);
    this.message = `Le film ${film.title} a été ajouté pour plus tard.`;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}
