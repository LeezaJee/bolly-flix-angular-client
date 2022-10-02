import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-genre",
  templateUrl: "./genre.component.html",
  styleUrls: ["./genre.component.scss"],
})
export class GenreComponent implements OnInit {
  /**
   * @service injects data from the MovieCard component using the MAT_DIALOG_DATA injection token
   * @example  {{ data.Description }} would render the genre's description
   * @param data
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Description: string;
    }
  ) {}

  ngOnInit(): void {}
}
