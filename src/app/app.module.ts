import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './components/header/header.component';
import { CategoryComponent } from './components/category/category.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RecipeDetailPopupComponent } from './components/recipe-detail-popup/recipe-detail-popup.component';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';
import {FavoriteDishesComponent} from './components/favorite-dishes/favorite-dishes.component';
import { MyDishesComponent } from './components/my-dishes/my-dishes.component';
import { ProfileComponentComponent } from './components/profile-component/profile-component.component';
import { RecomendComponent } from './components/recomend/recomend.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryComponent,
    RecipesComponent,
    RegisterComponent,
    LoginComponent,
    RecipeDetailPopupComponent,
    CreateRecipeComponent,
    FavoriteDishesComponent,
    MyDishesComponent,
    ProfileComponentComponent,
    RecomendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
