import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recipe-detail-popup',
  standalone: false,
  templateUrl: './recipe-detail-popup.component.html',
  styleUrl: './recipe-detail-popup.component.css'
})
export class RecipeDetailPopupComponent {
  @Input() dish: any;
  @Input() isOpen: boolean = false;
  @Output() closePopup = new EventEmitter<void>();

  isEditable: boolean = false;
  isFavorite: boolean = false;
  isUserDish: boolean = false;
  editableDish: any = {};
  currentUser: any ;

  constructor(private http: HttpClient) {}

  ngOnChanges(): void {
    if (this.dish) {
      console.log(this.dish);
      const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
      this.http.get<any>(`http://localhost:3000/users/${user.id}`).subscribe(user => {
        this.currentUser = user;
      })
      this.isUserDish = this.currentUser.recipes?.includes(Number(this.dish.id));
      this.editableDish = { ...this.dish }; // Make editable copy
    }
  }

  close(): void {
    this.isEditable = false;
    this.closePopup.emit();
  }

  enableEdit(): void {
    this.isEditable = true;
  }

  saveChanges(): void {
    // Convert string inputs back to arrays if needed
    if (typeof this.editableDish.ingredients === 'string') {
      this.editableDish.ingredients = this.editableDish.ingredients.split(',').map((i: string) => i.trim());
    }

    if (typeof this.editableDish.instructions === 'string') {
      this.editableDish.instructions = this.editableDish.instructions.split(',').map((i: string) => i.trim());
    }

    if (typeof this.editableDish.tags === 'string') {
      this.editableDish.tags = this.editableDish.tags.split(',').map((t: string) => t.trim());
    }

    this.http.put(`http://localhost:3000/recipes/${this.dish.id}`, this.editableDish).subscribe(() => {
      Object.assign(this.dish, this.editableDish);
      this.isEditable = false;
    });
  }
  addToFavorites(): void {
    if (!this.currentUser || !this.currentUser.id) return;

    const favorites = new Set(this.currentUser.favorites || []);

    if (this.isFavorite) {
      favorites.delete(Number(this.dish.id));
    } else {
      favorites.add(Number(this.dish.id));
    }

    // Update user object
    const updatedUser = {
      ...this.currentUser,
      favorites: Array.from(favorites)
    };

    // Update in sessionStorage
    sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
    this.currentUser = updatedUser;
    this.isFavorite = !this.isFavorite;

    // Update on server
    this.http.put(`http://localhost:3000/users/${this.currentUser.id}`, updatedUser).subscribe({
      next: () => {
        console.log(`${this.isFavorite ? 'Added to' : 'Removed from'} favorites`);
      },
      error: err => {
        console.error('Failed to update favorites:', err);
      }
    });
  }
  
}
