import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeBookComponent } from "./recipe-book.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { StartRecipeComponent } from "./recipe-list/start-recipe/start-recipe.component";
import { RecipesResolver } from "./recipe-solver.service";

const routes: Routes = [{
  path: "recipes",
  component: RecipeBookComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: 'create',
      component: RecipeEditComponent
    },
    {
      path: ':index',
      component: RecipeDetailComponent,
      resolve: [RecipesResolver]
    },
    {
      path: ':index/edit',
      component: RecipeEditComponent,
      resolve: [RecipesResolver]
    },
    {
      path: '',
      component: StartRecipeComponent
    },]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
