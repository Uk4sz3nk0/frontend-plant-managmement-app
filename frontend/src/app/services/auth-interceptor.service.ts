import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, take} from "rxjs";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _authService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let user: any;

    this._authService.user$.pipe(
      take(1)
    ).subscribe(
      (userData) => {
        user = userData;
      }
    );
    if (user) {
      const modifiedRequest: HttpRequest<any> = req.clone({setHeaders: {Authorization: `Bearer ${user.token}`}});
      return next.handle(modifiedRequest);
    } else {
      return next.handle(req);
    }
  }


}
