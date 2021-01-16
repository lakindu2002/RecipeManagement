import { Component, Input, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input("theRecipeInformation") theRecipe: Recipe;
  @Input("id") index: number;

  constructor(private theRecipeService: RecipeService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }
}
