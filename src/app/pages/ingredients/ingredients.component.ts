import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-ingredients",
  templateUrl: "./ingredients.component.html",
  styleUrls: ["./ingredients.component.css"],
})
export class IngredientsComponent {
  constructor(private router: Router, private http: HttpClient) {}

  //Clear Text Fields

  public clearFields() {
    this.ingredientName = "";
    this.category = "";
    this.price = 0;
    this.quantity = 0;
    this.nutrition = "";
  }

  //Get ingredient list

  public ingredientList: any;

  ngOnInit(): void {
    this.loadIngredients();
  }

  public loadIngredients() {
    this.http.get("http://localhost:8080/ingredient").subscribe((data) => {
      this.ingredientList = data;
    });
  }

  //Add a ingredient

  ingredientName: string = "";
  category: string = "";
  price: number = 0;
  quantity: number = 0;
  nutrition: string = "";

  public addIngredient() {
    const newIngredient = {
      name: this.ingredientName,
      category: this.category,
      price: this.price,
      quantity: this.quantity,
      nutrition: this.nutrition,
    };

    this.http.post("http://localhost:8080/ingredient", newIngredient).subscribe(
      (data) => {
        this.loadIngredients();
        this.clearFields();
        Swal.fire({
          icon: "success",
          title: "Ingredient added successfully",
          timer: 1700,
        });
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "We had trouble adding in!",
        });
        this.clearFields();
      }
    );
  }

  onAddButtonClick(): void {
    this.addIngredient();
  }

  //Delete a meal
  deleteIngredient(ingredientId: number): void {
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
          text: "Ingredient has been deleted.",
          icon: "success",
        });
        this.http
          .delete(`http://localhost:8080/ingredient/${ingredientId}`)
          .subscribe(
            (response) => {
              this.ingredientList = this.ingredientList.filter(
                (ingredient: { id: number }) => ingredient.id !== ingredientId
              );

              this.clearFields();
            },
            (error) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "We had trouble deleting in!",
              });
              this.clearFields();
            }
          );
      }
    });
  }
  //Update a meal
  selectedIngredient: any = {};

  onTableRowClick(ingredient: any): void {
    this.selectedIngredient = ingredient;
    this.ingredientName = ingredient.name;
    this.category = ingredient.category;
    this.price = ingredient.price;
    this.quantity = ingredient.quantity;
    this.nutrition = ingredient.nutrition;
    console.log(ingredient);
  }

  updateIngredient(): void {
    const updatedIngredient = {
      id: this.selectedIngredient.id,
      name: this.ingredientName,
      category: this.category,
      price: this.price,
      quantity: this.quantity,
      nutrition: this.nutrition,
    };

    this.http
      .put(
        `http://localhost:8080/ingredient/${this.selectedIngredient.id}`,
        updatedIngredient
      )
      .subscribe(
        () => {
          const index = this.ingredientList.findIndex(
            (ingredient: any) => ingredient.id === this.selectedIngredient.id
          );
          if (index !== -1) {
            this.ingredientList[index] = updatedIngredient;
          }
          Swal.fire({
            icon: "success",
            title: "Ingredient updated successfully",
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
