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
    console.log('Interceptor: Before handling request');
    // let user: any;

    // this._authService.user$.pipe(
    //   take(1)
    // ).subscribe(
    //   (userData) => {
    //     user = userData;
    //   }
    // );
    return this._authService.user$.pipe(
      take(1),
      switchMap(user => {
        const token = user ? user.token: this.cookieService.get('access_token');
        console.log(token)

        if (token) {
          console.log('Interceptor: Token available, modifying request');
          const modifiedRequest: HttpRequest<any> = req.clone({setHeaders: {Authorization: `Bearer ${token}`}});
          return next.handle(modifiedRequest);
        } else {
          console.log('Interceptor: Token not available, passing request as is');
          return next.handle(req);
        }

      })
    )

  }


}
