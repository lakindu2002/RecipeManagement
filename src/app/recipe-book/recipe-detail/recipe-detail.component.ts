import { Component, Input, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping-list/services/shoppinglist.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input("recipeInformation") obj: Recipe;
  constructor(private recipeList: RecipeService) { }

  ngOnInit(): void {
  }

  moveItemsToShoppingList() {
    this.recipeList.passDataToShoppingList(this.obj.getIngredients());
  }

}
