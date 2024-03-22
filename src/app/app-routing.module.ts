import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MealsComponent } from './pages/meals/meals.component';
import { IngredientsComponent } from './pages/ingredients/ingredients.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RatingsComponent } from './pages/ratings/ratings.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { NutritionsComponent } from './pages/nutritions/nutritions.component';
import { AllergensComponent } from './pages/allergens/allergens.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { UsersComponent } from './pages/users/users.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { OrdersComponent } from './pages/orders/orders.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'register',
    component:RegisterFormComponent
  },
  {
    path:'login',
    component:LoginFormComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'users',
    component:UsersComponent
  },
  {
    path:'employees',
    component:EmployeesComponent
  },
  {
    path:'orders',
    component:OrdersComponent
  },
  {
    path:'meals',
    component:MealsComponent
  },
  {
    path:'ingredients',
    component:IngredientsComponent
  },
  {
    path:'recipes',
    component:RecipesComponent
  },
  {
    path:'ratings',
    component:RatingsComponent
  },
  {
    path:'categories',
    component:CategoriesComponent
  },
  {
    path:'nutritions',
    component:NutritionsComponent
  },
  {
    path:'allergens',
    component:AllergensComponent
  },
  {
    path:'restaurants',
    component:RestaurantsComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
