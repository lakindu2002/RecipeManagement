import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeBookComponent } from "./recipe-book/recipe-book.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";


const routes: Routes = [
  { path: "recipes", component: RecipeBookComponent },
  { path: "shoppingList", component: ShoppingListComponent },
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  { path: "**", redirectTo: '/recipes', pathMatch: "full" }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
