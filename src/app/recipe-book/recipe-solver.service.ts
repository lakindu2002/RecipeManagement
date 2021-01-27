import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./services/recipe.service";

@Injectable({
  providedIn: 'root'
})
export class RecipesResolver implements Resolve<Recipe[]>{

  constructor(private data: DataStorageService, private recipeService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    if (this.recipeService.getRecipeList().length === 0) {
      return this.data.fetchRecipes();
    } else {
      return this.recipeService.getRecipeList();
    }
  }



}
