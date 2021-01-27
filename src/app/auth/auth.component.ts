import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogin: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  switchMode() {
    if (this.isLogin === true) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  }

}
