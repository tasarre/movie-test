// src/app/film-favoris/film-favoris.component.ts
import { Component, OnInit } from '@angular/core';
import { FavorisService } from '../favoris.service';
import { Film } from '../models/film.model';

@Component({
  selector: 'app-film-favoris',
  templateUrl: './film-favoris.component.html',
  styleUrls: ['./film-favoris.component.scss']
})
export class FilmFavorisComponent implements OnInit {
  favoris: Film[] = [];

  constructor(private favorisService: FavorisService) { }

  ngOnInit(): void {
    this.favorisService.getFavorisObservable().subscribe(favoris => {
      this.favoris = favoris;
    });
  }
}
