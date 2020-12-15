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
    switch (componentName) {
      case "RecipeComponent": {
        this.showRecipeList = true;
        this.showShoppingList = false;
        break;
      }
      case "ShoppingListComponent": {
        this.showShoppingList = true;
        this.showRecipeList = false;
        break;
      }
    }
  }
}
