import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {User} from "./auth-utils";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  public user: Subject<User> = new Subject<User>();

  constructor(private _http: HttpClient, private _router: Router, private _snackbar: MatSnackBar) {}


  auth(login: string, password: string){
    const user = { "email": login, "password": password}
    this._http.post('http://localhost:8080/auth/login', user).subscribe(data =>{
      console.log(data)
      if (data){
        // @ts-ignore
        const expDate: Date = new Date(new Date().getTime() + data.accessTokenDuration);
        // @ts-ignore
        const refExpDate: Date = new Date(new Date().getTime() + data.refreshTokenDuration);
        // @ts-ignore
        const newUsr: User = new User(data.user.id, data.user.email, data.user.firstName, data.user.lastName, data.user.role, data.accessToken, expDate, data.refreshToken, refExpDate);
        this.user.next(newUsr);
        this._router.navigate(['/home'])
      }

    },
    (error) =>{
      this._snackbar.open("Zły login i/lub hasło","", {
        duration: 2000
      })
    })
  }
}


