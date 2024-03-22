import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { HomeComponent } from "./pages/home/home.component";
import { RegisterFormComponent } from "./pages/register-form/register-form.component";
import { LoginFormComponent } from "./pages/login-form/login-form.component";
import { NavBarComponent } from "./common/nav-bar/nav-bar.component";

import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { UserAccessNavBarComponent } from "./common/user-access-nav-bar/user-access-nav-bar.component";
import { FooterComponent } from "./common/footer/footer.component";
import { UsersComponent } from "./pages/users/users.component";
import { EmployeesComponent } from "./pages/employees/employees.component";
import { MealsComponent } from "./pages/meals/meals.component";
import { IngredientsComponent } from "./pages/ingredients/ingredients.component";
import { RecipesComponent } from "./pages/recipes/recipes.component";
import { NutritionsComponent } from "./pages/nutritions/nutritions.component";
import { OrdersComponent } from "./pages/orders/orders.component";
import { RatingsComponent } from "./pages/ratings/ratings.component";
import { CategoriesComponent } from "./pages/categories/categories.component";
import { AllergensComponent } from "./pages/allergens/allergens.component";
import { RestaurantsComponent } from "./pages/restaurants/restaurants.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterFormComponent,
    LoginFormComponent,
    NavBarComponent,
    DashboardComponent,
    UserAccessNavBarComponent,
    FooterComponent,
    UsersComponent,
    EmployeesComponent,
    MealsComponent,
    IngredientsComponent,
    RecipesComponent,
    NutritionsComponent,
    OrdersComponent,
    RatingsComponent,
    CategoriesComponent,
    AllergensComponent,
    RestaurantsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
