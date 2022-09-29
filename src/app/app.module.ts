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
import { MovieCardComponent } from "./movie-card/movie-card.component";
import { WelcomePageComponent } from "./welcome-page/welcome-page.component";
import { RouterModule, Routes } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { DirectorComponent } from "./director/director.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { GenreComponent } from "./genre/genre.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ProfileComponent } from "./profile/profile.component";
import { SynopsisComponent } from "./synopsis/synopsis.component";

// defining routes
const appRoutes: Routes = [
  { path: "welcome", component: WelcomePageComponent },
  { path: "movies", component: MovieCardComponent },
  { path: "profile", component: ProfileComponent },
  // in case something happens the app will always redirect to the welcome route
  { path: "", redirectTo: "welcome", pathMatch: "prefix" },
];

// any features of Material Design that should be used in application will need to be included in app.module.ts file
@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    DirectorComponent,
    EditProfileComponent,
    GenreComponent,
    NavbarComponent,
    ProfileComponent,
    SynopsisComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
