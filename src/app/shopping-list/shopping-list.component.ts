import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './services/shoppinglist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  sub: Subscription;
  constructor(private shoppinglistService: ShoppingListService) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.shoppinglistService.ingredientRecieved.subscribe((data) => {
      this.ingredients = data;
    })
    this.ingredients = this.shoppinglistService.getList();
  }

  recievedAddIngredientClick(theIngredient: Ingredient) {
    this.ingredients.push(theIngredient);
  }

  editTriggered(index: number) {
    this.shoppinglistService.triggerEdit(index);
  }
}
