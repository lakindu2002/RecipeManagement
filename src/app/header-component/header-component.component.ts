import { Component, OnDestroy, OnInit, } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from '../data-storage.service';
import { RecipeService } from '../recipe-book/services/recipe.service';
import { ShoppingListService } from '../shopping-list/services/shoppinglist.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit, OnDestroy {

  sub: Subscription;
  isLoggedIn: boolean = false;
  constructor(private spinner: NgxSpinnerService, private auth: AuthService, private dataService: DataStorageService, private shoppinglist: ShoppingListService, private recipeList: RecipeService) { }

  ngOnInit(): void {
    this.sub = this.auth.userInfo.subscribe((userData) => {
      if (!(userData === null || userData === undefined)) {
        this.isLoggedIn = true;
      }
    })
  }

  saveData() {
    console.log("here")
    this.spinner.show();
    this.dataService.storeIngredients().subscribe((data) => {
      this.dataService.storeRecipes().subscribe((data) => {
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

      this.dataService.fetchIngredients().subscribe((data) => {
        this.shoppinglist.setList(data);
        this.spinner.hide();
      }, (error) => {
        console.log(error);
        this.spinner.hide();
      })
      this.spinner.hide();
    }, (error) => {
      console.log(error);
      this.spinner.hide();
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
