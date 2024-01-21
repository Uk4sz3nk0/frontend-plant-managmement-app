import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginService} from "./login.service";
import {CookieService} from 'ngx-cookie-service';
import {User} from "./auth-utils";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private _authService: LoginService, private cookieService: CookieService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Interceptor: Before handling request');
        const user: User = this._authService.user();
        const token: string = user ? user.token : this.cookieService.get('access_token');
        if (token) {
            console.log('Interceptor: Token available, modifying request');
            const modifiedRequest: HttpRequest<any> = req.clone({setHeaders: {Authorization: `Bearer ${token}`}});
            return next.handle(modifiedRequest);
        } else {
            console.log('Interceptor: Token not available, passing request as is');
            return next.handle(req);
        }
    }
}
