import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input("theRecipeInformation") theRecipe: Recipe;

  constructor(private theRecipeService: RecipeService) { }

  ngOnInit(): void {
  }

  showInDetail() {
    this.theRecipeService.theSelectedRecipe.emit(this.theRecipe);
  }

}
