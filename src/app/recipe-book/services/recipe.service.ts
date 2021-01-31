import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "src/app/shopping-list/services/shoppinglist.service";
import { Recipe } from "../recipe.model";

@Injectable()
export class RecipeService {
  // private testRecipe: Recipe = new Recipe("Hot & Spicy Pizza",
  //   "This is my First Recipe",
  //   "https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-4-500x500.jpg",
  //   [new Ingredient("Flour", 250), new Ingredient("Peporoni", 300)]);

  // private secondRecipe: Recipe = new Recipe("My Second Recipe",
  //   "This is the Second Recipe",
  //   "https://i2.wp.com/www.camerastupid.com/wp-content/uploads/2014/06/Screen-Shot-2014-06-03-at-10.54.02-AM.png?fit=571%2C854",
  //   [new Ingredient("Flour", 250), new Ingredient("Butter", 300)]);

  private recipeList: Recipe[] = [];

  public recipeListChanged: Subject<any> = new Subject();
  constructor(private theShoppingList: ShoppingListService) { }

  getRecipeList() {
    return this.recipeList;
  }

  passDataToShoppingList(ingrdients: Ingredient[]) {
    console.log(ingrdients)
    this.theShoppingList.updateList(ingrdients);
  }

  getRecipe(index: number): Recipe {
    return this.recipeList[index];
  }

  addRecipe(value: any) {
    let list: Ingredient[] = [];
    for (let i of value.ingredients) {
      list.push(new Ingredient(i.name, i.amount));
    }
    const theRecipe: Recipe = new Recipe(value.recipeName, value.recipeDescription, value.imageUrl, list);
    this.recipeList.push(theRecipe);
  }
  updateRecipe(recipeIndex: number, value: any) {
    let list: Ingredient[] = [];
    for (let i of value.ingredients) {
      list.push(new Ingredient(i.name, i.amount));
    }
    const theRecipe: Recipe = new Recipe(value.recipeName, value.recipeDescription, value.imageUrl, list);

    this.recipeList[recipeIndex] = theRecipe;
  }

  deleteRecipe(id: number) {
    this.recipeList.splice(id, 1);
  }

  setRecipes(data: Recipe[]) {
    this.recipeList = data;
    this.recipeListChanged.next(this.recipeList);
  }
}
