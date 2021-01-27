import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogin: boolean = true;

  theForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.theForm = new FormGroup({
      'emailAddress': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

  switchMode() {
    if (this.isLogin === true) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  }

  processRequest() {
    const { emailAddress, password } = this.theForm.value;
    this.theForm.reset();
  }

}
