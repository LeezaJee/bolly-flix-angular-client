// app's root component
import { Component } from "@angular/core";
import { UserRegistrationFormComponent } from "./user-registration-form/user-registration-form.component";
import { UserLoginFormComponent } from "./user-login-form/user-login-form.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "bolly-flix-Angular-client";

  // passed Angular Material dialog in the constructor as an argument so that it's available for use in this component
  constructor(public dialog: MatDialog) {}
  // this is the function that will open the dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // assign the dialog a width
      width: "280px",
    });
  }

  // open user login dialog when login button is clicked
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // assign dialog width
      width: "280px",
    });
  }
}
