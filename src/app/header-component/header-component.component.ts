import { Component, OnInit, } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { DataStorageService } from '../data-storage.service';
import { RecipeService } from '../recipe-book/services/recipe.service';
import { ShoppingListService } from '../shopping-list/services/shoppinglist.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private dataService: DataStorageService, private shoppinglist: ShoppingListService, private recipeList: RecipeService) { }

  ngOnInit(): void {
  }

  saveData() {
    this.spinner.show();
    this.dataService.storeIngredients().subscribe((data) => {
      console.log(data);
      this.dataService.storeRecipes().subscribe((data) => {
        console.log(data);
        this.spinner.hide();
      }, (error) => {
        console.log(error);
        this.spinner.hide();
      })
    }, (error) => {
      console.log(error);
      this.spinner.hide();
    })
  }
  loadData() {
    this.spinner.show();
    this.dataService.fetchRecipes().subscribe((data) => {
      this.recipeList.setRecipes(data);
      this.spinner.hide();
    }, (error) => {
      console.log(error);
      this.spinner.hide();
    })
  }

}
