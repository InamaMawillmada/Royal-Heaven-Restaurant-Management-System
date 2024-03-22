import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.css"],
})
export class RecipesComponent {
  constructor(private http: HttpClient) {}

  //Clear Text Fields

  public clearFields() {
    this.recipeName = "";
    this.category = "";
    this.cost = 0;
    this.status = "";
  }

  //View recipe list
  public recipeList: any;

  ngOnInit(): void {
    this.loadRecipes();
  }

  public loadRecipes() {
    this.http.get("http://localhost:8080/recipe").subscribe((data) => {
      this.recipeList = data;
    });
  }

  //Add a recipe

  recipeName: string = "";
  category: string = "";
  cost: number = 0;
  status: string = "";

  public addRecipe() {
    const newRecipe = {
      name: this.recipeName,
      category: this.category,
      cost: this.cost,
      status: this.status,
    };

    this.http
      .post("http://localhost:8080/recipe", newRecipe)
      .subscribe((data) => {
        this.loadRecipes();
        this.clearFields();
        Swal.fire({
          icon: "success",
          title: "Recipe added successfully",
          timer: 1700,
        });
      });
  }

  onAddButtonClick(): void {
    this.addRecipe();
  }

  //Delete recipe

  deleteRecipe(recipeId: number): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Recipe has been deleted.",
          icon: "success",
        });
        this.http
          .delete(`http://localhost:8080/recipe/${recipeId}`)
          .subscribe((response) => {
            this.recipeList = this.recipeList.filter(
              (recipe: { id: number }) => recipe.id !== recipeId
            );

            this.clearFields();
          });
      }
    });
  }
  //Update a recipe
  selectedRecipe: any = {};

  onTableRowClick(recipe: any): void {
    this.selectedRecipe = recipe;
    this.recipeName = recipe.name;
    this.category = recipe.category;
    this.cost = recipe.cost;
    this.status = recipe.status;
    console.log(recipe);
  }

  updateRecipe(): void {
    const updatedRecipe = {
      id: this.selectedRecipe.id,
      name: this.recipeName,
      category: this.category,
      cost: this.cost,
      status: this.status,
    };

    this.http
      .put(
        `http://localhost:8080/recipe/${this.selectedRecipe.id}`,
        updatedRecipe
      )
      .subscribe(
        () => {
          const index = this.recipeList.findIndex(
            (recipe: any) => recipe.id === this.selectedRecipe.id
          );
          if (index !== -1) {
            this.recipeList[index] = updatedRecipe;
          }
          Swal.fire({
            icon: "success",
            title: "Recipe updated successfully",
            timer: 1700,
          });
          this.clearFields();
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "We had trouble updating!",
          });
          this.clearFields();
        }
      );
  }
}
