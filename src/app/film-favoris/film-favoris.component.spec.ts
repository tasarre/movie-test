import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmFavorisComponent } from './film-favoris.component';

describe('FilmFavorisComponent', () => {
  let component: FilmFavorisComponent;
  let fixture: ComponentFixture<FilmFavorisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmFavorisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmFavorisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
