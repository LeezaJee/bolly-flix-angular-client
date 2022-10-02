import { Component, OnInit } from "@angular/core";
import { FetchApiDataService } from "../fetch-api-data.service";

import { EditProfileComponent } from "../edit-profile/edit-profile.component";

import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  /**
   * @service initializes the component loading the data
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * @service sends a GET request to the API to get details of a specific user
   * @returns object holding information about the requested user
   * @param resp
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  }

  /**
   * @service opens a dialog allowing users to update their details
   * @returns the EditProfileComponent
   */
  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: "300px",
    });
  }

  /**
   * @service sends a DELETE request to the API to remove a user profile
   * @returns the message "You have successfully deleted your account!"
   */
  deleteProfile(): void {
    if (confirm("Are you sure you want to delete your account?")) {
      this.router.navigate(["welcome"]).then(() => {
        this.snackBar.open(
          "You have successfully deleted your account!",
          "OK",
          {
            duration: 2000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
}
