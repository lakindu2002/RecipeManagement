import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PublicDirective } from '../shared/public-directive';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLogin: boolean = true;
  isError: boolean = false;
  errorMessage: string = "";
  sub: Subscription
  subscription: Subscription;

  theForm: FormGroup;
  @ViewChild(PublicDirective, { static: false }) theRef: PublicDirective

  constructor(private spinner: NgxSpinnerService, private authService: AuthService, private router: Router, private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.theForm = new FormGroup({
      'emailAddress': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })

    this.sub = this.authService.userInfo.subscribe((loggedInUser) => {
      if (loggedInUser !== null) {
        this.router.navigate(['recipes']);
      }
    });
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
          const tokenExpirationDate = new Date(new Date().getTime() + (+user.expiresIn * 1000));
          const loggedInUser: User = new User(emailAddress, user.localId, user.idToken, tokenExpirationDate);
          this.authService.userInfo.next(loggedInUser);
          this.authService.autoLogout(+user.expiresIn * 1000);
          localStorage.setItem('user', JSON.stringify(loggedInUser));

          this.spinner.hide();
        }, (error) => {
          this.isError = true;
          this.errorMessage = error;
          this.retrieveError(this.errorMessage);

          this.spinner.hide();
        })

      } else {
        this.authService.signUp(emailAddress, password).subscribe((user) => {
          const tokenExpirationDate = new Date(new Date().getTime() + (+user.expiresIn * 1000));
          const loggedInUser: User = new User(emailAddress, user.localId, user.idToken, tokenExpirationDate);
          this.authService.userInfo.next(loggedInUser);

          this.spinner.hide();
        }, (error) => {
          if (error.error.error.message === "EMAIL_EXISTS") {
            this.isError = true;
            this.errorMessage = "Email Address is already Registered"
            this.retrieveError(this.errorMessage);
          } else {
            this.isError = true;
            this.errorMessage = "Error Encountered";
            this.retrieveError(this.errorMessage);

          }
          this.spinner.hide();
        })
      }
    }
  }

  handleClose() {
    this.isError = false;
  }

  retrieveError(errorMessage) {
    const alertFactory = this.resolver.resolveComponentFactory(AlertComponent);
    const containerRef: ViewContainerRef = this.theRef.ref;
    containerRef.clear();
    const ref = containerRef.createComponent(alertFactory);
    ref.instance.message = errorMessage;
    this.subscription = ref.instance.closer.subscribe(() => {
      containerRef.clear();
    })


  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
