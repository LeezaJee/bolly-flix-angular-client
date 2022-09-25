import { Component, OnInit, Input } from "@angular/core";

// You'll use this import to close the dialog on success
import { MatDialogRef } from "@angular/material/dialog";

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from "../fetch-api-data.service";

// This import is used to display notifications back to the user
import { MatSnackBar } from "@angular/material/snack-bar";

// @Component decorator tells Angular that the class below is a component
// contains instructions for wiring up the class with its stylesheet and template file
@Component({
  // selector property defines the custom HTML element, into which this component will render
  selector: "app-user-registration-form",
  templateUrl: "./user-registration-form.component.html",
  styleUrls: ["./user-registration-form.component.scss"],
})
export class UserRegistrationFormComponent implements OnInit {
  // @Input is another decorator that defines the component's input
  @Input() userData = { Username: "", Password: "", Email: "" };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  // ngOnInit method is called once the component has received all its inputs (all its data-bound properties) from the calling component (user)
  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    // userDate object from above will then be passed into API call
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!
        console.log(result);
        this.snackBar.open(result, "OK", {
          duration: 2000,
        });
      },
      (result) => {
        console.log(result);
        this.snackBar.open(result, "OK", {
          duration: 2000,
        });
      }
    );
  }
}
