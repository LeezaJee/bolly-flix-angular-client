import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-synopsis",
  templateUrl: "./synopsis.component.html",
  styleUrls: ["./synopsis.component.scss"],
})
export class SynopsisComponent implements OnInit {
  /**
   * @service injects data from the MovieCard component using the MAT_DIALOG_DATA injection token
   * @example {{ data.Description }} would render a summary of a selected movie
   * @param data
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      Description: string;
    }
  ) {}

  ngOnInit(): void {}
}
