import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-nutritions",
  templateUrl: "./nutritions.component.html",
  styleUrls: ["./nutritions.component.css"],
})
export class NutritionsComponent {
  constructor(private http: HttpClient) {}

  //Clear Text Fields

  public clearFields() {
    this.nutritionName = "";
    this.benefit = "";
    this.type = "";
  }

  //View nutrition list

  public nutritionList: any;

  ngOnInit(): void {
    this.loadNutritions();
  }

  public loadNutritions() {
    this.http.get("http://localhost:8080/nutrition").subscribe((data) => {
      this.nutritionList = data;
    });
  }

  //Add a nutrition

  nutritionName: string = "";
  benefit: string = "";
  type: string = "";

  public addNutrition() {
    const newNutrition = {
      name: this.nutritionName,
      benefit: this.benefit,
      type: this.type,
    };

    this.http
      .post("http://localhost:8080/nutrition", newNutrition)
      .subscribe((data) => {
        this.loadNutritions();
        this.clearFields();
        Swal.fire({
          icon: "success",
          title: "Nutrient added successfully",
          timer: 1700,
        });
      });
  }

  onAddButtonClick(): void {
    this.addNutrition();
  }

  //Delete a nutrition
  deleteNutrition(nutritionId: number): void {
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
          text: "Nutrient has been deleted.",
          icon: "success",
        });
        this.http
          .delete(`http://localhost:8080/nutrition/${nutritionId}`)
          .subscribe((response) => {
            this.nutritionList = this.nutritionList.filter(
              (nutrition: { id: number }) => nutrition.id !== nutritionId
            );

            this.clearFields();
          });
      }
    });
  }
  //Update a nutrient
  selectedNutrition: any = {};

  onTableRowClick(nutrition: any): void {
    this.selectedNutrition = nutrition;
    this.nutritionName = nutrition.name;
    this.benefit = nutrition.benefit;
    this.type = nutrition.type;

    console.log(nutrition);
  }

  updateNutrition(): void {
    const updatedNutrition = {
      id: this.selectedNutrition.id,
      name: this.nutritionName,
      benefit: this.benefit,
      type: this.type,
    };

    this.http
      .put(
        `http://localhost:8080/nutrition/${this.selectedNutrition.id}`,
        updatedNutrition
      )
      .subscribe(
        () => {
          const index = this.nutritionList.findIndex(
            (nutrition: any) => nutrition.id === this.selectedNutrition.id
          );
          if (index !== -1) {
            this.nutritionList[index] = updatedNutrition;
          }
          Swal.fire({
            icon: "success",
            title: "Nutrient updated successfully",
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
