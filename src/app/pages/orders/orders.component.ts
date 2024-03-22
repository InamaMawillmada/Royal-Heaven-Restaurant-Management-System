import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"],
})
export class OrdersComponent {
  constructor(private http: HttpClient) {}

  public orderList: any;

  ngOnInit(): void {
    this.loadOrders();
  }
  //Get orders
  public loadOrders() {
    this.http.get("http://localhost:8080/order").subscribe((data) => {
      this.orderList = data;
    });
  }
  
  //Delete orders
  deleteOrder(orderId: number): void {
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
          text: "Order has been deleted.",
          icon: "success",
        });

        this.http
          .delete(`http://localhost:8080/order/${orderId}`)
          .subscribe((response) => {
            this.orderList = this.orderList.filter(
              (order: { id: number }) => order.id !== orderId
            );
          });
      }
    });
  }
}
