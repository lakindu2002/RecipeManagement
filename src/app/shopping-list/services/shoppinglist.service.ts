import { Ingredient } from "src/app/shared/ingredient.model";

export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  addIngredient(theIngredient: Ingredient) {
    this.ingredients.push(theIngredient);
  }

  getList() {
    return this.ingredients;
  }

  updateList(concatArray: Ingredient[]) {
    this.ingredients.push(...concatArray);
  }
}
