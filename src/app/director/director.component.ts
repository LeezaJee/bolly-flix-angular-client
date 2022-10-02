import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-director",
  templateUrl: "./director.component.html",
  styleUrls: ["./director.component.scss"],
})
export class DirectorComponent implements OnInit {
  /**
   * @service injects data from the MovieCard component using the MAT_DIALOG_DATA injection token
   * @example  {{ data.Birth }} would render the director's birth year
   * @param data
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      Birth: Date;
    }
  ) {}

  ngOnInit(): void {}
}
