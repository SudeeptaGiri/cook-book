import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-dishes',
  standalone: false,
  templateUrl: './my-dishes.component.html',
  styleUrl: './my-dishes.component.css'
})
export class MyDishesComponent {
  myDishes: any[] = [];
  createdRecipeIds: number[] = [];  
  selectedDish: any = null;
  isPopupOpen: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const userData = sessionStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.createdRecipeIds = user.recipes;
      this.http.get<any[]>('http://localhost:3000/users').subscribe(dishes => {
        this.createdRecipeIds = dishes.find(u => u.id === user.id)?.recipes || [];
      })
      this.http.get<any[]>('http://localhost:3000/recipes').subscribe(dishes => {
        this.myDishes = dishes.filter(dish => this.createdRecipeIds.includes(Number(dish.id)));
      });
      console.log("myDishes=",this.myDishes);
    }
  }
  openRecipePopup(dish: any): void {
    this.selectedDish = dish;
    this.isPopupOpen = true;
  }

  closeRecipePopup(): void {
    this.isPopupOpen = false;
  }
  deleteRecipe(dishId: number): void {
    this.http.delete(`http://localhost:3000/recipes/${dishId}`).subscribe(() => {
      this.myDishes = this.myDishes.filter(dish => dish.id !== dishId);
    });
  }
}
