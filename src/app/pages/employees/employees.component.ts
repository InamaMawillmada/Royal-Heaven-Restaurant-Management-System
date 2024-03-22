import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Swal from "sweetalert2";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.css"],
})
export class EmployeesComponent {
  constructor(private http: HttpClient) {}

  //Clear Text Fields

  public clearFields() {
    this.employeeName = "";
    this.email = "";
    this.position = "";
    this.description = "";
  }

  //View employee list

  public employeeList: any;

  ngOnInit(): void {
    this.loadEmployees();
  }

  public loadEmployees() {
    this.http.get("http://localhost:8080/employee").subscribe((data) => {
      this.employeeList = data;
    });
  }

  //Add a employee

  employeeName: string = "";
  email: string = "";
  position: string = "";
  description: string = "";

  public addEmployee() {
    const newEmployee = {
      name: this.employeeName,
      email: this.email,
      position: this.position,
      description: this.description,
    };

    this.http.post("http://localhost:8080/employee", newEmployee).subscribe(
      (data) => {
        this.loadEmployees();
        this.clearFields();
        Swal.fire({
          icon: "success",
          title: "Employee added successfully",
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
    this.addEmployee();
  }

  //Delete a employee
  deleteEmployee(employeeId: number): void {
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
          text: "Employee has been deleted.",
          icon: "success",
        });
        this.http
          .delete(`http://localhost:8080/employee/${employeeId}`)
          .subscribe(
            (response) => {
              this.employeeList = this.employeeList.filter(
                (employee: { id: number }) => employee.id !== employeeId
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

  //Update a employee
  selectedEmployee: any = {};

  onTableRowClick(employee: any): void {
    this.selectedEmployee = employee;
    this.employeeName = employee.name;
    this.email = employee.email;
    this.position = employee.position;
    this.description = employee.description;
    console.log(employee);
  }

  updateEmployee(): void {
    const updatedEmployee = {
      id: this.selectedEmployee.id,
      name: this.employeeName,
      email: this.email,
      position: this.position,
      description: this.description,
    };

    this.http
      .put(
        `http://localhost:8080/employee/${this.selectedEmployee.id}`,
        updatedEmployee
      )
      .subscribe(
        () => {
          const index = this.employeeList.findIndex(
            (employee: any) => employee.id === this.selectedEmployee.id
          );
          if (index !== -1) {
            this.employeeList[index] = updatedEmployee;
          }
          Swal.fire({
            icon: "success",
            title: "Employee updated successfully",
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
