import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../services/shoppinglist.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild("theForm", { static: true }) theForm: NgForm;
  editSubscription: Subscription;
  editIndex: number = undefined;
  isEditing: boolean = false;
  retrievedIngredient: Ingredient = undefined;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.editSubscription = this.shoppingListService.editTriggered.subscribe((index) => {
      this.isEditing = true;
      this.retrievedIngredient = this.shoppingListService.getIngredient(index);
      this.editIndex = index;
      this.theForm.setValue({
        ingredientName: this.retrievedIngredient.getName(),
        requiredAmount: this.retrievedIngredient.getAmount()
      })
    })
  }

  addIngredient() {
    if (this.isEditing) {
      this.shoppingListService.updateIngredient(this.editIndex, new Ingredient(this.theForm.value["ingredientName"], this.theForm.value["requiredAmount"]));
      this.isEditing = false
    } else {
      this.shoppingListService.addIngredient(new Ingredient(this.theForm.value["ingredientName"], this.theForm.value["requiredAmount"]))
    }
    this.theForm.reset();
  }

  resetForm() {
    if (this.isEditing) {
      this.isEditing = false;
    }
    this.theForm.reset();
  }

  deleteItem() {
    this.shoppingListService.deleteItem(this.editIndex);
    this.isEditing = false;
    this.theForm.reset();
    this.editIndex = undefined;
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }

}
