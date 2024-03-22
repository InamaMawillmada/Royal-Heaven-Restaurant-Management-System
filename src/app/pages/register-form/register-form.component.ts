import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.css"],
})
export class RegisterFormComponent {
  constructor(private router: Router, private http: HttpClient) {}

  userName: string = "";
  userEmail: string = "";
  userPassword: string = "";

  public clearFields() {
    this.userName = "";
    this.userEmail = "";
    this.userPassword = "";
  }

  public registerUser() {
    const newUser = {
      name: this.userName,
      email: this.userEmail,
      password: this.userPassword,
    };

    this.http.post("http://localhost:8080/user", newUser).subscribe(
      (data) => {
        Swal.fire({
          icon: "success",
          title: "Your have been registered successfully",
          timer: 1700,
        });
        this.router.navigate(["/dashboard"]);
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "We had trouble register!",
        });
        this.clearFields();
      }
    );
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  }

  onRegisterButtonClick(): void {
    if (
      this.userName != "" &&
      this.userEmail != "" &&
      this.userPassword != ""
    ) {
      if (!this.validateEmail(this.userEmail)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter a valid email",
        });
        this.clearFields;
      }
      if (!this.validatePassword(this.userPassword)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            "Please enter a valid password with the below characters - At least one lowercase letter,At least one uppercase letter, At least one digit, Minimum length of 8 characters",
        });
      } else {
        this.registerUser();
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the forms",
      });
      this.clearFields;
    }
  }
}
