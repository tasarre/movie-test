import { Component, OnInit } from '@angular/core';
import { Film } from '../models/film.model';
import { WatchlistService } from '../watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  films: Film[] = [];
  filmsRegardes: Film[] = [];
  filmsAVoir: Film[] = [];

  constructor(private watchlistService: WatchlistService) { }

  ngOnInit(): void {
    this.watchlistService.getWatchlistObservable().subscribe((watchlist: Film[]) => {
      this.films = watchlist;
      this.filmsRegardes = watchlist.filter(film => film.regarde);
      this.filmsAVoir = watchlist.filter(film => !film.regarde);
    });
  }

  toggleRegarde(film: Film): void {
    const isWatched = !film.regarde;
    this.watchlistService.updateWatchlist(film, isWatched);
  }
}
