import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListRoutingModule } from "./shopping-list.routing.module";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent,],
  imports: [
    FormsModule,
    ShoppingListRoutingModule,
    CommonModule,
    SharedModule
  ],
})
export class ShoppingListModule { }
