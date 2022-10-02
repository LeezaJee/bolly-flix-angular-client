import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  /**
   * @service navigates to the movies (main) page
   */
  goToMovies(): void {
    this.router.navigate(["movies"]);
  }

  /**
   * @service navigates to the user profile
   */
  goToProfile(): void {
    this.router.navigate(["profile"]);
  }

  /**
   * @service logs users out of their account, clears the local storage and resets token and user
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(["welcome"]);
  }
}
