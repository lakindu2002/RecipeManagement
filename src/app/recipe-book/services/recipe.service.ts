import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "src/app/shopping-list/services/shoppinglist.service";
import { Recipe } from "../recipe.model";

@Injectable()
export class RecipeService {
  private testRecipe: Recipe = new Recipe("Hot & Spicy Pizza",
    "This is my First Recipe",
    "https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-4-500x500.jpg",
    [new Ingredient("Flour", 250), new Ingredient("Peporoni", 300)]);

  private secondRecipe: Recipe = new Recipe("My Second Recipe",
    "This is the Second Recipe",
    "https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-4-500x500.jpg",
    [new Ingredient("Flour", 250), new Ingredient("Buns", 300)]);

  private recipeList: Recipe[] = [this.testRecipe, this.secondRecipe];


  public theSelectedRecipe = new EventEmitter<Recipe>();

  constructor(private theShoppingList : ShoppingListService){}

  getRecipeList() {
    return this.recipeList;
  }

  getSelectedEvent() {
    return this.theSelectedRecipe;
  }

  passDataToShoppingList(ingrdients: Ingredient[]) {
    this.theShoppingList.updateList(ingrdients);
  }
}
