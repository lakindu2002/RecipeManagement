import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output("toDetail") toDetail = new EventEmitter<Recipe>();

  testRecipe: Recipe = new Recipe("Hot & Spicy Pizza",
    "This is my First Recipe",
    "https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-4-500x500.jpg");

  recipeList: Recipe[] = [this.testRecipe,
  new Recipe("My Second Recipe",
    "This is the Second Recipe",
    "https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-4-500x500.jpg")];

  constructor() { }

  ngOnInit(): void {
  }

  retrievedToRecipeList(theRecipe: Recipe) {
    this.toDetail.emit(theRecipe);
  }

}
