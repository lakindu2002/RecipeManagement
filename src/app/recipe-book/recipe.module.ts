import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { RecipeBookComponent } from "./recipe-book.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { StartRecipeComponent } from "./recipe-list/start-recipe/start-recipe.component";
import { RecipeRoutingModule } from "./recipe-routing.module";

@NgModule({
  declarations: [
    RecipeBookComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    StartRecipeComponent,
  ],
  imports: [
    ReactiveFormsModule,
    RecipeRoutingModule,
    SharedModule,
  ],
  exports: [
    //these can be commented out because they are not used or declared anywhere outside the recipe module.
    // RecipeBookComponent,
    // RecipeListComponent,
    // RecipeDetailComponent,
    // RecipeItemComponent,
    // RecipeEditComponent,
    RecipeRoutingModule],
})
export class RecipeModule {

}
