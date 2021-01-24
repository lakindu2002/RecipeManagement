import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  obj: Recipe;
  id: number;

  sub: Subscription;
  constructor(private recipeList: RecipeService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.obj = this.recipeList.getRecipe(+params['index'])
      this.id = +params['index'];
    })
  }

  moveItemsToShoppingList() {
    this.recipeList.passDataToShoppingList(this.obj.getIngredients());
  }

  navigate() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
  }

  deleteRecipe(){
    this.recipeList.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
