import { Subject } from "rxjs";
import { Ingredient } from "src/app/shared/ingredient.model";

export class ShoppingListService {
  ingredients: Ingredient[] = [];
  public editTriggered: Subject<number> = new Subject<number>();
  public ingredientRecieved: Subject<Ingredient[]> = new Subject();

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredient(theIngredient: Ingredient) {
    this.ingredients.push(theIngredient);
  }

  getList() {
    return this.ingredients;
  }

  updateList(concatArray: Ingredient[]) {
    if(this.ingredients===null){
      this.ingredients = [];
    }
    this.ingredients.push(...concatArray);
  }

  triggerEdit(index: number) {
    this.editTriggered.next(index);
  }

  updateIngredient(editIndex: number, retrievedIngredient: Ingredient) {
    this.ingredients.forEach((value, index) => {
      if (index === editIndex) {
        value.name = retrievedIngredient.name;
        value.amount = retrievedIngredient.amount;
        return;
      }
    })
  }

  deleteItem(editIndex: number) {
    this.ingredients.splice(editIndex, 1);
  }

  setList(data: Ingredient[]) {
    this.ingredients = data;
    this.ingredientRecieved.next(this.ingredients);
  }
}
