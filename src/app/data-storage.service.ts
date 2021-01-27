import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "./recipe-book/recipe.model";
import { RecipeService } from "./recipe-book/services/recipe.service";
import { Ingredient } from "./shared/ingredient.model";
import { ShoppingListService } from "./shopping-list/services/shoppinglist.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private url: string = "https://recipe-book-536b4-default-rtdb.firebaseio.com/";

  constructor(private recipeService: RecipeService, private shoppinglist: ShoppingListService, private http: HttpClient) { }

  storeRecipes() {
    const recipeList = this.recipeService.getRecipeList();
    return this.http.put(this.url + "recipes.json", recipeList);
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.url + "recipes.json");
  }

  storeIngredients() {
    const ingredients = this.shoppinglist.getList();
    return this.http.put(this.url + "ingriedients.json", ingredients);
  }

  fetchIngredients() {
    return this.http.get<Ingredient[]>(this.url + "ingrdients.json");
  }
}
