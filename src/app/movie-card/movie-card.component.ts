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
  ngOnInit(): void {
    this.getMovies();
  }

  // gets movies from api call and sets the movies state to return JSON file
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  // opens the genre dialog to display details
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

  // opens the director dialog to display details
  openDirectorDialog(name: string, bio: string, birthday: Date): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthday: birthday,
      },
      // Assign dialog width
      width: "500px",
    });
  }

  // opens the synopsis dialog to display movie details
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

