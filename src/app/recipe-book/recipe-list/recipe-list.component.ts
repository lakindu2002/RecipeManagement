import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/app/data-storage.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipeList: any = [];
  isLoaded: boolean = false;
  constructor(private theRecipeService: RecipeService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeList = this.theRecipeService.getRecipeList();

    this.theRecipeService.recipeListChanged.subscribe((data) => {
      this.recipeList = data;
    })
  }

  navigate() {
    this.router.navigate(['create'], { relativeTo: this.activatedRoute });
  }
}
