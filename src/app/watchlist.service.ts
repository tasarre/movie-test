import { Injectable } from '@angular/core';
import { Film } from './models/film.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  watchlist: BehaviorSubject<Film[]> = new BehaviorSubject<Film[]>([]);
  private readonly STORAGE_KEY = 'watchlist';

  constructor() {
    this.watchlist.next(this.getWatchlist());
  }

  getWatchlist(): Film[] {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  }

  saveWatchlist(watchlist: Film[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(watchlist));
    this.watchlist.next(watchlist);
  }

  updateWatchlist(film: Film, isWatched: boolean): void {
    const watchlist = this.watchlist.getValue();
    const index = watchlist.findIndex((item) => item.id === film.id);
    if (index !== -1) {
      watchlist[index].regarde = isWatched;
      this.saveWatchlist(watchlist);
    }
  }

  addFilm(film: Film): void {
    const watchlist = this.watchlist.getValue();
    watchlist.push(film);
    this.saveWatchlist(watchlist);
  }

  removeFilm(film: Film): void {
    const watchlist = this.watchlist.getValue();
    const updatedWatchlist = watchlist.filter((item) => item.id !== film.id);
    this.saveWatchlist(updatedWatchlist);
  }

  isFilmInWatchlist(film: Film): boolean {
    const watchlist = this.watchlist.getValue();
    return watchlist.some((item) => item.id === film.id);
  }

  getWatchlistObservable(): Observable<Film[]> {
    return this.watchlist.asObservable();
  }
}
