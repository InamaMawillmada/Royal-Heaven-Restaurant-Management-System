import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Swal from "sweetalert2";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-ratings",
  templateUrl: "./ratings.component.html",
  styleUrls: ["./ratings.component.css"],
})
export class RatingsComponent {
  constructor(private http: HttpClient) {}

  //Clear Text Fields

  public clearFields() {
    this.raterName = "";
    this.review = "";
  }

  //View rate list

  public rateList: any;

  ngOnInit(): void {
    this.loadRates();
  }

  public loadRates() {
    this.http.get("http://localhost:8080/rate").subscribe((data) => {
      this.rateList = data;
    });
  }

  //Add a rate

  raterName: string = "";
  review: string = "";

  public addRate() {
    const newRate = {
      rater_name: this.raterName,
      review: this.review,
    };

    this.http.post("http://localhost:8080/rate", newRate).subscribe((data) => {
      this.loadRates();
      this.clearFields();
      Swal.fire({
        icon: "success",
        title: "Rate added successfully",
        timer: 1700,
      });
    });
  }

  onAddButtonClick(): void {
    this.addRate();
  }
}
