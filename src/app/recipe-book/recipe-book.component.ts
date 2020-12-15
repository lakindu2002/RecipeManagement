import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent implements OnInit {
  theRecipeInformation: Recipe = undefined;

  constructor() { }

  ngOnInit(): void {
  }

  retrievedRecipeInformation(theRecipe: Recipe) {
    this.theRecipeInformation = theRecipe;
  }

}
