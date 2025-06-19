import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-recipe',
  standalone: false,
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css'
})
export class CreateRecipeComponent {
  recipeForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', [Validators.required, Validators.pattern(/^https?:\/\//)]],
      description: ['', Validators.required],
      ingredients: ['', Validators.required], // comma-separated
      cuisine: ['', Validators.required],
      category: ['', Validators.required],
      tags: ['', Validators.required], // comma-separated
      cookingTime: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      difficulty: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.recipeForm.invalid) {
      this.errorMessage = 'Please fix the highlighted errors before submitting.';
      this.recipeForm.markAllAsTouched();
      return;
    }

    const formValues = this.recipeForm.value;
    const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    const userId = user?.id;
    const newRecipeId = Date.now(); // unique

    const newRecipe = {
      id: newRecipeId,
      name: formValues.name,
      image: formValues.image,
      ingredients: formValues.ingredients.split(',').map((i: string) => i.trim()),
      instructions: formValues.description.split(',').map((step: string) => step.trim()),
      cuisine: formValues.cuisine,
      difficulty: formValues.difficulty,
      tags: formValues.tags.split(',').map((tag: string) => tag.trim()),
      prepTimeMinutes: Math.floor(+formValues.cookingTime / 2),
      cookTimeMinutes: Math.ceil(+formValues.cookingTime / 2),
      servings: 4,
      caloriesPerServing: 300,
      rating: 0,
      reviewCount: 0,
      userId: userId,
      mealType: [formValues.category],
    };

    this.http.post('http://localhost:3000/recipes', newRecipe).subscribe({
      next: () => {
        // 🟡 After successfully posting the recipe, update user's recipe list
        this.http.get<any>(`http://localhost:3000/users/${userId}`).subscribe(user => {
          const updatedUser = {
            ...user,
            recipes: [...(user.recipes || []), newRecipeId]
          };

          this.http.put(`http://localhost:3000/users/${userId}`, updatedUser).subscribe({
            next: () => {
              alert('Recipe created and user updated successfully!');
              this.recipeForm.reset();
              this.errorMessage = '';
            },
            error: () => {
              this.errorMessage = 'Recipe saved but failed to update user.';
            }
          });
        });
      },
      error: () => {
        this.errorMessage = 'Failed to save recipe. Please try again.';
      },
    });
    this.router.navigate(['/recipes']);
  }
}
