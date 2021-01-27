import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
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

  userInfo: Subject<User> = new Subject<User>();

  private key: string = "AIzaSyBmZF3hDLS3GaiR9rHUKUjRBjXsQkmTWVY";
  private signupUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.key;
  private loginUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.key;

  constructor(private http: HttpClient) { }

  signUp(emailAddress: string, password: string) {
    return this.http.post<FirebaseUser>(this.signupUrl, { email: emailAddress, password: password, returnSecureToken: true });
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


}
