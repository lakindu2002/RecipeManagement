import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
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
    CommonModule
  ],
  exports: [
    DropdownDirective,
    AlertComponent,
    PublicDirective,
  ],
})
export class SharedModule { }
