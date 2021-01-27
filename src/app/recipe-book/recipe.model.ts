import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
  public recipeName: string;
  public recipeDescription: string;
  public imagePath: string;
  public theIngredients: Ingredient[];
  public img: string;

  constructor(recipeName: string, recipeDescription: string, imagePath: string, theIngredients: Ingredient[]) {
    this.recipeName = recipeName;
    this.recipeDescription = recipeDescription;
    this.imagePath = imagePath;
    this.theIngredients = theIngredients;
    this.img = imagePath;
  }
}
