import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Swal from "sweetalert2";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-meals",
  templateUrl: "./meals.component.html",
  styleUrls: ["./meals.component.css"],
})
export class MealsComponent {
  constructor(private http: HttpClient) {}

  //Clear Text Fields

  public clearFields() {
    this.mealName = "";
    this.category = "";
    this.price = 0;
    this.description = "";
  }

  //View meal list

  public mealList: any;

  ngOnInit(): void {
    this.loadMeals();
  }

  public loadMeals() {
    this.http.get("http://localhost:8080/meal").subscribe((data) => {
      this.mealList = data;
    });
  }

  //Add a meal

  mealName: string = "";
  category: string = "";
  price: number = 0;
  description: string = "";

  public addMeal() {
    const newMeal = {
      name: this.mealName,
      category: this.category,
      price: this.price,
      description: this.description,
    };

    this.http.post("http://localhost:8080/meal", newMeal).subscribe(
      (data) => {
        this.loadMeals();
        this.clearFields();
        Swal.fire({
          icon: "success",
          title: "Meal added successfully",
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
    this.addMeal();
  }

  //Delete a meal
  deleteMeal(mealId: number): void {
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
          text: "Meal has been deleted.",
          icon: "success",
        });
        this.http.delete(`http://localhost:8080/meal/${mealId}`).subscribe(
          (response) => {
            this.mealList = this.mealList.filter(
              (meal: { id: number }) => meal.id !== mealId
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
  selectedMeal: any = {};

  onTableRowClick(meal: any): void {
    this.selectedMeal = meal;
    this.mealName = meal.name;
    this.category = meal.category;
    this.price = meal.price;
    this.description = meal.description;
    console.log(meal);
  }

  updateMeal(): void {
    const updatedMeal = {
      id: this.selectedMeal.id,
      name: this.mealName,
      category: this.category,
      price: this.price,
      description: this.description,
    };

    this.http
      .put(`http://localhost:8080/meal/${this.selectedMeal.id}`, updatedMeal)
      .subscribe(
        () => {
          const index = this.mealList.findIndex(
            (meal: any) => meal.id === this.selectedMeal.id
          );
          if (index !== -1) {
            this.mealList[index] = updatedMeal;
          }
          Swal.fire({
            icon: "success",
            title: "Meal updated successfully",
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
