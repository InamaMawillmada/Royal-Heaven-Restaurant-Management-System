import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Swal from "sweetalert2";
import { FormsModule } from "@angular/forms";
@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"],
})
export class CategoriesComponent {
  constructor(private http: HttpClient) {}

  //Clear Text Fields

  public clearFields() {
    this.categoryName = "";
    this.description = "";
  }

  //View category list

  public categoryList: any;

  ngOnInit(): void {
    this.loadCategories();
  }

  public loadCategories() {
    this.http.get("http://localhost:8080/category").subscribe((data) => {
      this.categoryList = data;
    });
  }

  //Add a category

  categoryName: string = "";
  description: string = "";

  public addCategory() {
    const newCategory = {
      name: this.categoryName,
      description: this.description,
    };

    this.http
      .post("http://localhost:8080/category", newCategory)
      .subscribe((data) => {
        this.loadCategories();
        this.clearFields();
        Swal.fire({
          icon: "success",
          title: "Category added successfully",
          timer: 1700,
        });
      });
  }

  onAddButtonClick(): void {
    this.addCategory();
  }
}
