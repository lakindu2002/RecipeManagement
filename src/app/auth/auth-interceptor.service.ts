import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.userInfo.pipe(take(1), exhaustMap((user) => {
      if (user) {
        const mod = req.clone({
          params: new HttpParams().set('auth', user.getToken()),
        })
        return next.handle(mod);
      } else {
        return next.handle(req);
      }
    }))
  }
}
