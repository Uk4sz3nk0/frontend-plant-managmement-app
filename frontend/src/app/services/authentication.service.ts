import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'  
})

export class AuthenticationService {
  

  constructor(private http: HttpClient, private router: Router, private snackbar: MatSnackBar) {}


  auth(login: string, password: string){
    const user = { "email": login, "password": password}  
    this.http.post('http://localhost:8080/auth/login', user).subscribe(data =>{
      console.log(data)
      if (data){
        this.router.navigate(['/home'])
      }
     
    },
    (error) =>{
      this.snackbar.open("Zły login i/lub hasło","", {
        duration: 2000
      })
    })
  }
}


