import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CourseProject';

  showRecipeList: boolean = false;
  showShoppingList: boolean = false;

  showComponent(componentName: string) {
    if (componentName === "RecipeComponent") {
      this.showRecipeList = true;
      this.showShoppingList = false;
    } else if (componentName === "ShoppingListComponent") {
      this.showShoppingList = true;
      this.showRecipeList = false;
    }
  }
}
