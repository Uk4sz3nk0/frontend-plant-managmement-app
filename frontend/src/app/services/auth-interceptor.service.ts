import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, from, take} from "rxjs";
import {AuthenticationService} from "./authentication.service";
import { switchMap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _authService: AuthenticationService, private cookieService: CookieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let user: any;

    // this._authService.user$.pipe(
    //   take(1)
    // ).subscribe(
    //   (userData) => {
    //     user = userData;
    //   }
    // );
    return from(this._authService.user$).pipe(
      switchMap(user => {
        const token = user ? user.token: this.cookieService.get('dane');

        if (token) {
          const modifiedRequest: HttpRequest<any> = req.clone({setHeaders: {Authorization: `Bearer ${token}`}});
          return next.handle(modifiedRequest);
        } else {
          return next.handle(req);
        }

      })
    )

  }


}
