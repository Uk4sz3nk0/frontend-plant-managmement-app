import {HttpClient} from '@angular/common/http';
import {Injectable, signal, WritableSignal} from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {User, USER_DATA_KEY} from "./auth-utils";
import {CookieService} from 'ngx-cookie-service';
import {Auth} from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private _tokenExpirationTimer: any;
  public readonly user: WritableSignal<User> = signal(null);

  constructor(private _http: HttpClient, private _router: Router, private _snackbar: MatSnackBar, private _cookieService: CookieService) {
  }

  auth(login: string, password: string): void {

    const user = {"email": login, "password": password}
  
    this._http.post<Auth>('http://localhost:8080/auth/login', user).subscribe(data => {
        if (data) {
          const expDate: Date = new Date(new Date().getTime() + +data.accessTokenDuration);
          const refExpDate: Date = new Date(new Date().getTime() + +data.refreshTokenDuration);
          const newUsr: User = new User(data.user.id, data.user.email, data.user.firstName, data.user.lastName, data.user.role, data.accessToken, expDate, data.refreshToken, refExpDate);
          this.user.set(newUsr);
          localStorage.setItem(USER_DATA_KEY, JSON.stringify(newUsr));
          this._cookieService.set('access_token', data.accessToken, expDate, '/');
          this._cookieService.set('refresh_token', data.refreshToken, expDate, '/');
          // @ts-ignore
          this.autoLogout(data.accessTokenDuration);
          ;
          this._router.navigate(['/menu/list']).then();

        }

      },
      (error) => {
        this._snackbar.open("Zły login i/lub hasło", "", {
          duration: 2000
        })
      })
  }

  autoLogin(): void {
    const userData = JSON.parse(localStorage.getItem(USER_DATA_KEY) as string);
    if (!userData) {
      return;
    }
    const loadedUser: User = new User(userData.id, userData.email, userData.firstName, userData.lastName, {
      name: userData._role.name,
      permissions: userData._role.permissions
    }, userData._token, new Date(userData.tokenExpiration), userData.refreshToken, new Date(userData.refreshTokenExpiration));
    if (loadedUser) {
      this.autoLogout(new Date(userData.tokenExpiration).getTime() - new Date().getTime())
      this.user.set(loadedUser);
    }
  }

  logout(): void {

    this._cookieService.delete('access_token');
    this._cookieService.delete('refresh_token');
    // @ts-ignore
    this.user.set(null);
    localStorage.removeItem(USER_DATA_KEY);
    if (this._tokenExpirationTimer) {
      clearTimeout(this._tokenExpirationTimer);
    }
    this._router.navigate(['/login']).then();
  }


  autoLogout(expirationDuration: number) {
 
  }
}


