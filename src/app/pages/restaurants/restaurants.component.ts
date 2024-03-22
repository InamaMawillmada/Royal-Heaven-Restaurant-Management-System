import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Swal from "sweetalert2";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-restaurants",
  templateUrl: "./restaurants.component.html",
  styleUrls: ["./restaurants.component.css"],
})
export class RestaurantsComponent {
  constructor(private http: HttpClient) {}

  //Clear Text Fields

  public clearFields() {}

  //View restaurant list

  public restaurantList: any;

  ngOnInit(): void {
    this.loadRestaurants();
  }

  public loadRestaurants() {
    this.http.get("http://localhost:8080/restaurant").subscribe((data) => {
      this.restaurantList = data;
    });
  }
}
