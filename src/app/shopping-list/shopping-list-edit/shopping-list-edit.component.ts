import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../services/shoppinglist.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  @ViewChild("amountInput", { static: true }) theAmount: ElementRef

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  addIngredient(input: HTMLInputElement) {
    const name = input.value;
    const value = this.theAmount.nativeElement.value;

    let theIngredient: Ingredient = new Ingredient(name, value);

    this.shoppingListService.addIngredient(theIngredient);
  }

}
