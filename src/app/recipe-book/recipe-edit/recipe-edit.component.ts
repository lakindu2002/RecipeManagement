import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  editMode: boolean = false;

  sub: Subscription;

  theForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipes: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.theForm = new FormGroup({
      'recipeName': new FormControl(null, [Validators.required]),
      'recipeDescription': new FormControl(null, [Validators.required]),
      'imageUrl': new FormControl(null, Validators.required),
      'ingredients': new FormArray([]),
    });

    this.sub = this.route.params.subscribe((params) => {
      this.recipeIndex = +params['index'];
      if (this.recipeIndex != NaN) {
        this.recipe = this.recipes.getRecipe(this.recipeIndex);
        if (this.recipe) {
          this.editMode = true;
          let ingredientList = new FormArray([]);

          for (let i of this.recipe.getIngredients()) {
            ingredientList.push(new FormGroup({
              'name': new FormControl(i.getName(), Validators.required),
              'amount': new FormControl(i.getAmount(), [Validators.required, Validators.pattern("^[1-9][0-9]*$")])
            }));
          }
          this.theForm = new FormGroup({
            'recipeName': new FormControl(this.recipe.getRecipeName().trim(), [Validators.required]),
            'recipeDescription': new FormControl(this.recipe.getRecipeDescription(), [Validators.required]),
            'imageUrl': new FormControl(this.recipe.getImagePath(), Validators.required),
            'ingredients': ingredientList,
          });
        }
      } else {
        this.editMode = false;

        this.theForm = new FormGroup({
          'recipeName': new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z]+$')]),
          'recipeDescription': new FormControl(null, [Validators.required]),
          'imageUrl': new FormControl(null, Validators.required),
          'ingredients': new FormArray([]),
        });
      }
    })
  }

  processRecipe() {
    if (this.editMode) {
      this.recipes.updateRecipe(this.recipeIndex, this.theForm.value);
    } else {
      this.recipes.addRecipe(this.theForm.value);
    }
    this.router.navigate(['/recipes'])
  }

  createIngredient() {
    const ingredientName = new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z]+$')]);
    const amount = new FormControl(null, [Validators.required, Validators.pattern("^[1-9][0-9]*$")]);

    (<FormArray>this.theForm.get('ingredients')).push(new FormGroup({
      'name': ingredientName,
      'amount': amount
    }));
  }

  getIngredientControls() {
    return (<FormArray>this.theForm.get('ingredients')).controls;
  }

  removeItem(index: number) {
    (<FormArray>this.theForm.get('ingredients')).removeAt(index);
  }

  resetForm() {
    this.theForm.reset();
  }

  cancel() {
    if (this.editMode) {
      this.router.navigate(['/recipes', this.recipeIndex]);
    } else {
      this.router.navigate(['/recipes']);
    }
  }

  removeAllIngreidnts() {
    (<FormArray>this.theForm.get('ingredients')).clear();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
