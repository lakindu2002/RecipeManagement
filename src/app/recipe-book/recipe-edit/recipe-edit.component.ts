import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  recipeIndex: number
  recipe: Recipe;

  sub: Subscription;

  constructor(private route: ActivatedRoute, private recipes: RecipeService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.recipeIndex = +params['index'];
      if (this.recipeIndex != NaN) {
        this.recipe = this.recipes.getRecipe(this.recipeIndex);
      }
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
