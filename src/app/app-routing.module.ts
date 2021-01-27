import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeBookComponent } from "./recipe-book/recipe-book.component";
import { RecipeDetailComponent } from "./recipe-book/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-book/recipe-edit/recipe-edit.component";
import { StartRecipeComponent } from "./recipe-book/recipe-list/start-recipe/start-recipe.component";
import { RecipesResolver } from "./recipe-book/recipe-solver.service";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";


const routes: Routes = [
  {
    path: "recipes",
    component: RecipeBookComponent,
    children: [
      {
        path: 'create',
        component: RecipeEditComponent
      },
      {
        path: ':index',
        component: RecipeDetailComponent,
        resolve:[RecipesResolver]
      },
      {
        path: ':index/edit',
        component: RecipeEditComponent,
        resolve:[RecipesResolver]
      },
      {
        path: '',
        component: StartRecipeComponent
      },]
  },
  {
    path: "shoppingList",
    component: ShoppingListComponent
  },
  {
    path: "",
    redirectTo: "/recipes",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: '/recipes',
    pathMatch: "full"
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
