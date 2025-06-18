import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';
import { FavoriteDishesComponent } from './components/favorite-dishes/favorite-dishes.component';
import { MyDishesComponent } from './components/my-dishes/my-dishes.component';
import { ProfileComponentComponent } from './components/profile-component/profile-component.component';
import { RecomendComponent } from './components/recomend/recomend.component';

const routes: Routes = [
  { path: '', component: RecipesComponent  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recipes', component: RecipesComponent }, 
  {path:'create-recipe',component:CreateRecipeComponent},
  {path: 'favorites', component: FavoriteDishesComponent},
  { path: 'my-recipes', component: MyDishesComponent },
  {
    path: 'profile',
    component: ProfileComponentComponent
  },
  {path:"recommend",component:RecomendComponent}
  

  // add other routes here
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
