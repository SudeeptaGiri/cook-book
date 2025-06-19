import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recomend',
  standalone: false,
  templateUrl: './recomend.component.html',
  styleUrl: './recomend.component.css'
})
export class RecomendComponent {
  myDishes: any[] = [];  
  selectedDish: any = null;
  isPopupOpen: boolean = false;
  userId: string | null = null;
  userFavorites: number[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
   
      this.http.get<any[]>('http://localhost:3000/recipes').subscribe(dishes => {
        this.myDishes = dishes.sort((dish1,dish2) => dish2.rating - dish1.rating);
      });

  }
  openRecipePopup(dish: any): void {
    this.selectedDish = dish;
    this.isPopupOpen = true;
  }

  closeRecipePopup(): void {
    this.isPopupOpen = false;
  }
  
  getUserFavorites() {
    this.http.get<any>(`http://localhost:3000/users/${this.userId}`).subscribe(user => {
      this.userFavorites = user.favorites || [];
    });
  }

  isFavorite(dishId: number): boolean {
    return this.userFavorites.includes(Number(dishId));
  }

  toggleFavorite(dishId: number) {
    if (!this.userId) return;

    if (this.isFavorite(dishId)) {
      this.userFavorites = this.userFavorites.filter((id: number) => Number(id) !== Number(dishId));
    } else {
      this.userFavorites.push(Number(dishId));
    }

    this.http.patch(`http://localhost:3000/users/${this.userId}`, {
      favorites: this.userFavorites
    }).subscribe();
  }
}
