import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recipes',
  standalone: false,
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent {
  dishes: any[] = [];
  selectedCuisine: string = '';
  selectedCategory: string = '';
  selectedCookingTime: number = 0;
  selectedDifficulty: string = '';
  filteredDishesArray: any[] = [];
  searchValue: string = '';
  selectedDish: any = null;
  isPopupOpen: boolean = false;
  userId: string | null = null;
  userFavorites: number[] = [];
  onSearchUpdate(term: string) {
    this.searchValue = term;
  }
  constructor(private http: HttpClient) {
    
  }
  ngOnInit() {
    this.http.get<any>('http://localhost:3000/recipes').subscribe({
      next: (res) => {
        console.log('result', res);
        this.dishes = res;
      },
      error: (err) => {
        console.error('Failed to fetch recipes:', err);
      },
    });
      this.userId = JSON.parse(sessionStorage.getItem('currentUser') || '{}')?.id || null;
      if (this.userId) {
        this.getUserFavorites();
      }
  }
  get uniqueCuisines(): string[] {
    return [...new Set(this.dishes.map(dish => dish.cuisine))];
  }
  get uniqueCategories(): string[] {
    return [...new Set(this.dishes.flatMap(dish => dish.mealType))];
  }
  
  get uniqueCookingTimes(): number[] {
    return [...new Set(this.dishes.map(dish => dish.cookTimeMinutes))].sort((a, b) => a - b);
  }
  get uniqueDifficulties(): string[] {
    return [...new Set(this.dishes.map(dish => dish.difficulty))];
  }
  filteredDishes() {
    return this.dishes.filter(dish => {
      const matchesCuisine = this.selectedCuisine ? dish.cuisine === this.selectedCuisine : true;
      const matchesCategory = this.selectedCategory ? dish.mealType.includes(this.selectedCategory) : true;
      const matchesCookingTime = this.selectedCookingTime ? dish.cookTimeMinutes <= this.selectedCookingTime : true;
      const matchesDifficulty = this.selectedDifficulty ? dish.difficulty === this.selectedDifficulty : true;
      const lowerSearch = this.searchValue.toLowerCase();
  
      const matchesSearch =
        dish.name.toLowerCase().includes(lowerSearch) ||
        dish.tags.some((tag:string) => tag.toLowerCase().includes(lowerSearch));
  
      return matchesCuisine && matchesSearch && matchesCategory && matchesCookingTime && matchesDifficulty;
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
