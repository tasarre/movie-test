// src/app/favoris.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Film } from './models/film.model';

@Injectable({
  providedIn: 'root'
})
export class FavorisService {
  private favorisKey = 'favoris';
  private favorisSubject: BehaviorSubject<Film[]>;

  constructor() {
    const favorisStored = localStorage.getItem(this.favorisKey);
    const favoris = favorisStored ? JSON.parse(favorisStored) : [];
    this.favorisSubject = new BehaviorSubject<Film[]>(favoris);
  }

  getFavoris(): Film[] {
    return this.favorisSubject.value;
  }

  getFavorisObservable() {
    return this.favorisSubject.asObservable();
  }

  ajouterAuxFavoris(film: Film): void {
    const favoris = this.getFavoris();
    if (!this.estDansFavoris(film)) {
      favoris.push(film);
      localStorage.setItem(this.favorisKey, JSON.stringify(favoris));
      this.favorisSubject.next(favoris);
    }
  }

  supprimerDesFavoris(film: Film): void {
    const favoris = this.getFavoris().filter(f => f.id !== film.id);
    localStorage.setItem(this.favorisKey, JSON.stringify(favoris));
    this.favorisSubject.next(favoris);
  }

  estDansFavoris(film: Film): boolean {
    return this.getFavoris().some(f => f.id === film.id);
  }
}
