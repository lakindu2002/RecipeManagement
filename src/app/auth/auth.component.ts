import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogin: boolean = true;
  isError: boolean = false;
  errorMessage: string = "";

  theForm: FormGroup;

  constructor(private spinner: NgxSpinnerService, private authService: AuthService) { }

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
    this.isError = false;
    if (this.theForm.valid) {
      this.spinner.show();
      const { emailAddress, password } = this.theForm.value;
      this.theForm.reset();

      if (this.isLogin) {
        this.authService.login(emailAddress, password).subscribe((user) => {
          const tokenExpirationDate = new Date(new Date().getTime() + Number(user.expiresIn));
          const loggedInUser: User = new User(emailAddress, user.localId, user.idToken, tokenExpirationDate);
          this.authService.userInfo.next(loggedInUser);

          this.spinner.hide();
        }, (error) => {
          this.isError = true;
          this.errorMessage = error;
          this.spinner.hide();
        })

      } else {
        this.authService.signUp(emailAddress, password).subscribe((user) => {
          const tokenExpirationDate = new Date(new Date().getTime() + Number(user.expiresIn));
          const loggedInUser: User = new User(emailAddress, user.localId, user.idToken, tokenExpirationDate);
          this.authService.userInfo.next(loggedInUser);

          this.spinner.hide();
        }, (error) => {
          if (error.error.error.message === "EMAIL_EXISTS") {
            this.isError = true;
            this.errorMessage = "Email Address is already Registered"
          } else {
            this.isError = true;
            this.errorMessage = "Error Encountered";
          }
          this.spinner.hide();
        })
      }
    }
  }

}
