import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthComponent } from "./auth.component";

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [AuthComponent]
})
export class AuthModule { }
