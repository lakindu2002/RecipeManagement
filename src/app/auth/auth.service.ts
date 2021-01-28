import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "./user.model";

export interface FirebaseUser {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
  displayName?: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private tokenTimer: any;


  private key: string = "AIzaSyBmZF3hDLS3GaiR9rHUKUjRBjXsQkmTWVY";
  private signupUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.key;
  private loginUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.key;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(emailAddress: string, password: string) {
    return this.http.post<FirebaseUser>(this.signupUrl, { email: emailAddress, password: password, returnSecureToken: true });
  }


  logout() {
    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
    }
    this.userInfo.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('user');
    this.tokenTimer = null;
  }

  login(emailAddress: string, password: string) {
    return this.http.post<FirebaseUser>(this.loginUrl, { email: emailAddress, password: password, returnSecureToken: true }).pipe(catchError(error => {
      let errorMsg = "Error Encountered While Logging In"
      if (error.error.error.message) {
        switch (error.error.error.message) {
          case "EMAIL_NOT_FOUND": {
            errorMsg = "Email Address or Password Incorrect";
            break;
          }
          case "INVALID_PASSWORD": {
            errorMsg = "Email Address or Password Incorrect";
            break;
          }
          case "USER_DISABLED": {
            errorMsg = "User Account Has Been Disabled";
            break;
          }
        }
      }
      return throwError(errorMsg);
    }));
  }

  autoLogin() {
    const item: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('user'));
    if (item) {
      const loadedUser: User = new User(item.email, item.id, item._token, new Date(item._tokenExpirationDate));
      if (loadedUser.getToken()) {
        this.userInfo.next(loadedUser);
        this.autoLogout(new Date(item._tokenExpirationDate).getTime() - new Date().getTime())
      } else {
        return;
      }
    } else {
      return;
    }
  }

  autoLogout(expirationTimer: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expirationTimer)
  }


}
