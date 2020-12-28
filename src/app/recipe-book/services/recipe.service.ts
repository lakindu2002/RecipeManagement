import { EventEmitter } from "@angular/core";
import { Recipe } from "../recipe.model";

export class RecipeService {
  private testRecipe: Recipe = new Recipe("Hot & Spicy Pizza",
    "This is my First Recipe",
    "https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-4-500x500.jpg");

  private recipeList: Recipe[] = [this.testRecipe,
  new Recipe("My Second Recipe",
    "This is the Second Recipe",
    "https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-4-500x500.jpg")];


  public theSelectedRecipe = new EventEmitter<Recipe>();

  getRecipeList() {
    return this.recipeList;
  }

  getSelectedEvent() {
    return this.theSelectedRecipe;
  }
}
