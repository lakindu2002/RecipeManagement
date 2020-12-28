import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
  private recipeName: string;
  private recipeDescription: string;
  private imagePath: string;
  private theIngredients: Ingredient[];

  constructor(recipeName: string, recipeDescription: string, imagePath: string, theIngredients: Ingredient[]) {
    this.recipeName = recipeName;
    this.recipeDescription = recipeDescription;
    this.imagePath = imagePath;
    this.theIngredients = theIngredients;
  }

  getRecipeName(): string {
    return this.recipeName;
  }

  getRecipeDescription(): string {
    return this.recipeDescription;
  }

  getImagePath(): string {
    return this.imagePath;
  }

  getIngredients(){
    return this.theIngredients;
  }
}
