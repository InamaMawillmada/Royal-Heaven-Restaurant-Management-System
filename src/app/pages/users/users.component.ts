import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  constructor(private http: HttpClient) {}
  
  public userList: any;
  public filteredUserList: any;
  public searchQuery: string = "";

  ngOnInit(): void {
    this.loadUsers();
  }

  //Get Users
  public loadUsers() {
    this.http.get("http://localhost:8080/user").subscribe((data) => {
      this.userList = data;
      this.filteredUserList = this.userList;
    });
  }

  //Search User by name
  public searchUsers() {
    this.filteredUserList = this.userList.filter((user: { name: string }) =>
      user.name.toString().includes(this.searchQuery)
    );
  }
}
