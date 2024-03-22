import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { FormsModule } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"],
})
export class LoginFormComponent {
  constructor(private http: HttpClient, private router: Router) {}

  public clearFields() {
    (this.userName = ""), (this.password = "");
  }

  userName: string = "";
  password: string = "";

  //Authenticate user on btn click
  onLoginButtonClick() {
    const user = { name: this.userName, password: this.password };
    this.authenticateUser(user).subscribe(
      (response: any) => {
        if (response === true) {
          Swal.fire({
            icon: "success",
            title: "You have logged in successfuly",
            timer: 1700,
          });
          this.router.navigate(["/dashboard"]);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Incorrect password",
          });
          this.clearFields();
        }
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User not found",
        });
        this.clearFields();
      }
    );
  }

  private authenticateUser(user: any): Observable<boolean> {
    const apiUrl = "http://localhost:8080/user/authenticateUser";
    return this.http.post<boolean>(apiUrl, user);
  }
}
