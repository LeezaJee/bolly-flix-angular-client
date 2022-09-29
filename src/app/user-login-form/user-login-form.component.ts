import { Component, OnInit, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-login-form",
  templateUrl: "./user-login-form.component.html",
  styleUrls: ["./user-login-form.component.scss"],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: "", Password: "" };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // sendsb  form inputs for user login to backend via fetchApiData Service
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        // TBD: Logic for successfull login!
        console.log(result);
        // Add token and username to local Storage
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", result.user.Username);
        this.dialogRef.close(); // Close the modal on success
        this.snackBar.open("Login successful", "OK", {
          duration: 2000,
        });
        this.router.navigate(["movies"]);
      },
      (result) => {
        this.snackBar.open("Login failed", "OK", {
          duration: 2000,
        });
      }
    );
  }
}
