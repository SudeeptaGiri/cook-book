import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteDishesComponent } from './favorite-dishes.component';

describe('FavoriteDishesComponent', () => {
  let component: FavoriteDishesComponent;
  let fixture: ComponentFixture<FavoriteDishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriteDishesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
