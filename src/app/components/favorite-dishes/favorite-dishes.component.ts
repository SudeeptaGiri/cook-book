import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-favorite-dishes',
  standalone: false,
  templateUrl: './favorite-dishes.component.html',
  styleUrl: './favorite-dishes.component.css'
})
export class FavoriteDishesComponent {
  favoriteDishes: any[] = [];
  favoritesIds: number[] = [];
  selectedDish: any = null;
  isPopupOpen: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const userData = sessionStorage.getItem('currentUser');
    if (userData) {
      let currUser = JSON.parse(userData);
      this.http.get<any[]>('http://localhost:3000/users').subscribe(user => {
        this.favoritesIds = user.find(u => u.id === currUser.id)?.favorites || [];
      })
      // Fetch all dishes once
      this.http.get<any[]>('http://localhost:3000/recipes').subscribe(dishes => {
        this.favoriteDishes = dishes.filter(dish => this.favoritesIds.includes(Number(dish.id)));
      });
    }
  }
  openRecipePopup(dish: any): void {
    this.selectedDish = dish;
    this.isPopupOpen = true;
  }

  closeRecipePopup(): void {
    this.isPopupOpen = false;
  }
}
