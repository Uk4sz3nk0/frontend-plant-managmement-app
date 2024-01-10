import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {User, USER_DATA_KEY} from "./auth-utils";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private _tokenExpirationTimer: any;
  // @ts-ignore
  public user$: Subject<User> = new Subject<User>(null);

  constructor(private _http: HttpClient, private _router: Router, private _snackbar: MatSnackBar) {}


  auth(login: string, password: string): void{
    const user = { "email": login, "password": password}
    console.log('LOGGING IN')
    this._http.post('http://localhost:8080/auth/login', user).subscribe(data =>{
      console.log(data)
      if (data){
        // @ts-ignore
        const expDate: Date = new Date(new Date().getTime() + +data.accessTokenDuration);
        // @ts-ignore
        const refExpDate: Date = new Date(new Date().getTime() + +data.refreshTokenDuration);
        // @ts-ignore
        const newUsr: User = new User(data.user.id, data.user.email, data.user.firstName, data.user.lastName, data.user.role, data.accessToken, expDate, data.refreshToken, refExpDate);
        this.user$.next(newUsr);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(newUsr));
        // @ts-ignore
        this.autoLogout(data.accessTokenDuration);;
        this._router.navigate(['/home'])
      }

    },
    (error) =>{
      this._snackbar.open("Zły login i/lub hasło","", {
        duration: 2000
      })
    })
  }

  autoLogin(): void {
    const userData: User = JSON.parse(localStorage.getItem(USER_DATA_KEY) as string);
    if (!userData) {
      return;
    }
    console.log(userData)

    // @ts-ignore
    const loadedUser: User = new User(userData.id, userData.email, userData.firstName, userData.lastName, userData.role, userData.token, new Date(userData.tokenExpiration), userData.refreshToken, new Date(userData.refreshTokenExpiration));
    if (loadedUser) {
    //  this.autoLogout(new Date(userData.tokenExpiration).getTime() - new Date().getTime())
      this.user$.next(loadedUser);
    }
  }

  logout(): void {
    // @ts-ignore
    // this.user$.next(null);
    // this._router.navigate(['/login']);
    // localStorage.removeItem(USER_DATA_KEY);
    // if (this._tokenExpirationTimer) {
    //   clearTimeout(this._tokenExpirationTimer);
    // }
  }

  autoLogout(expirationDuration: number) {
    // this._tokenExpirationTimer = setTimeout(() => {
    //   this.logout()
    // }, expirationDuration)
    // console.log('logout')
  }
}


