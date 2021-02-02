import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { PublicDirective } from "./public-directive";

@NgModule({
  declarations: [
    DropdownDirective,
    AlertComponent,
    PublicDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    DropdownDirective,
    AlertComponent,
    PublicDirective,
    CommonModule,
    ReactiveFormsModule
  ],
})
export class SharedModule { }
