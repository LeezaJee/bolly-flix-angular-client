// this file is the entry point of your Angular app
// it's mostly used to wire up different modules together and express dependencies
import { NgModule } from "@angular/core";
/* HttpClientModule is a simplified API for Angular applications that makes it possible for the client app 
to communicate with the API or server-side */
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// to use the Material modules (the Angular module that exports everything necessary to use the Material elements) in your component
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { FormsModule } from "@angular/forms";
import { UserRegistrationFormComponent } from "./user-registration-form/user-registration-form.component";
import { UserLoginFormComponent } from "./user-login-form/user-login-form.component";
import { RouterModule, Routes } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

// any features of Material Design that should be used in application will need to be included in app.module.ts file
@NgModule({
  declarations: [AppComponent, UserRegistrationFormComponent, UserLoginFormComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
