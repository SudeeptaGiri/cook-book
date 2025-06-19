import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailPopupComponent } from './recipe-detail-popup.component';

describe('RecipeDetailPopupComponent', () => {
  let component: RecipeDetailPopupComponent;
  let fixture: ComponentFixture<RecipeDetailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeDetailPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
