import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";


const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'recipes',
    loadChildren: () => import("./recipe-book/recipe.module").then((m) => m.RecipeModule),
  },
  {
    path: 'shoppingList',
    loadChildren: () => import("./shopping-list/shopping-list.module").then((m) => m.ShoppingListModule)
  },
  {
    path: "",
    redirectTo: "/auth",
    pathMatch: "full"
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
