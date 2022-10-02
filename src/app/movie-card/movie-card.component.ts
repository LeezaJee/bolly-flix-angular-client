import { Component, OnInit } from "@angular/core";
import { FetchApiDataService } from "../fetch-api-data.service";

import { GenreComponent } from "../genre/genre.component";
import { DirectorComponent } from "../director/director.component";
import { SynopsisComponent } from "../synopsis/synopsis.component";

import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrls: ["./movie-card.component.scss"],
})
export class MovieCardComponent implements OnInit {
  // variable movies declared as an array
  // this is where the movies returned from the API call will be kept
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  // getMovies() is called in the ngOnInit() lifecycle hook
  // ngOnInit() is called when Angular is done creating the component (in React ComponentDidMount)
  /**
   * @service initializes the component loading the data
   */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * @service gets all movies from the API endpoint via FetchApiDataService and populates the local state variable
   * @returns an array holding all movies objects
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * @service opens a dialog to display details of the movie genre
   * @returns the GenreComponent
   * @param name
   * @param description
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      // Assign dialog width
      width: "500px",
    });
  }

  /**
   * @service opens a dialog to display details of the director
   * @returns the DirectorComponent
   * @param name
   * @param bio
   * @param birth
   */
  openDirectorDialog(name: string, bio: string, birth: Date): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      // Assign dialog width
      width: "500px",
    });
  }

  /**
   * @servcice opens a dialog to display a movie synopsis
   * @returns the SynopsisComponent
   * @param title
   * @param description
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description,
      },
      // Assign dialog width
      width: "500px",
    });
  }

  /**
   * @service adds a movie to the user's list of favorite movies via FetchApiDataService
   * @returns updated favorite movie list
   * @param MovieID
   */
  addToFavoriteMovies(MovieID: string): void {
    console.log(MovieID);
    this.fetchApiData.addFavoriteMovie(MovieID).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }

  /**
   * @service removes a movie from the list of favorite movies via FetchApiDataService
   * @returns updated favorite movie list
   * @param MovieID
   */
  removeFromFavoriteMovies(MovieID: string): void {
    console.log(MovieID);
    this.fetchApiData.removeFavoriteMovie(MovieID).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }
}
