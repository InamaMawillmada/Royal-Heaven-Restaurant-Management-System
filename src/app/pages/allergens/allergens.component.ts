import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Swal from "sweetalert2";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-allergens",
  templateUrl: "./allergens.component.html",
  styleUrls: ["./allergens.component.css"],
})
export class AllergensComponent {
  constructor(private http: HttpClient) {}

  //Clear Text Fields

  public clearFields() {
    this.allergenName = "";
    this.cause = "";
  }

  //View allergen list

  public allergenList: any;

  ngOnInit(): void {
    this.loadAllergens();
  }

  public loadAllergens() {
    this.http.get("http://localhost:8080/allergen").subscribe((data) => {
      this.allergenList = data;
    });
  }

  //Add a allergen

  allergenName: string = "";
  cause: string = "";

  public addAllergen() {
    const newAllergen = {
      name: this.allergenName,
      cause: this.cause,
    };

    this.http
      .post("http://localhost:8080/allergen", newAllergen)
      .subscribe((data) => {
        this.loadAllergens();
        this.clearFields();
        Swal.fire({
          icon: "success",
          title: "Allergen added successfully",
          timer: 1700,
        });
      });
  }

  onAddButtonClick(): void {
    this.addAllergen();
  }

  //Delete a allergen
  deleteAllergen(allergenId: number): void {
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
          text: "Allergen has been deleted.",
          icon: "success",
        });
        this.http
          .delete(`http://localhost:8080/allergen/${allergenId}`)
          .subscribe((response) => {
            this.allergenList = this.allergenList.filter(
              (allergen: { id: number }) => allergen.id !== allergenId
            );

            this.clearFields();
          });
      }
    });
  }

  //Update a allergen
  selectedAllergen: any = {};

  onTableRowClick(allergen: any): void {
    this.selectedAllergen = allergen;
    this.allergenName = allergen.name;
    this.cause = allergen.cause;
    console.log(allergen);
  }

  updateAllergen(): void {
    const updatedAllergen = {
      id: this.selectedAllergen.id,
      name: this.allergenName,
      cause: this.cause,
    };

    this.http
      .put(
        `http://localhost:8080/allergen/${this.selectedAllergen.id}`,
        updatedAllergen
      )
      .subscribe(
        () => {
          const index = this.allergenList.findIndex(
            (allergen: any) => allergen.id === this.selectedAllergen.id
          );
          if (index !== -1) {
            this.allergenList[index] = updatedAllergen;
          }
          Swal.fire({
            icon: "success",
            title: "Allergen updated successfully",
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
