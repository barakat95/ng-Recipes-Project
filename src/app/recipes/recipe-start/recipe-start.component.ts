import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";

@Component({
  selector: "app-recipe-start",
  templateUrl: "./recipe-start.component.html",
  styleUrls: ["./recipe-start.component.css"]
})
export class RecipeStartComponent implements OnInit {
  recipeStartingMessage: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.recipeStartingMessage = data["message"];
    });
  }
}
