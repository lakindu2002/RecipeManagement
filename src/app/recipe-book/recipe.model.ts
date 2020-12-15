export class Recipe {
  private recipeName: string;
  private recipeDescription: string;
  private imagePath: string;

  constructor(recipeName: string, recipeDescription: string, imagePath: string) {
    this.recipeName = recipeName;
    this.recipeDescription = recipeDescription;
    this.imagePath = imagePath;
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
}
