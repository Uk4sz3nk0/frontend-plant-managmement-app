import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  
})

export class AuthenticationService {
  

  constructor(private http: HttpClient) {}

  // auth(login: string, password: string): Observable<any>{
  //   const headers = { "email": login, "password": password}  
  //   return this.http.post('http://localhost:8080/auth/login', headers)
  // }

  auth(login: string, password: string){
    const user = { "email": login, "password": password}  
    this.http.post('http://localhost:8080/auth/login', user).subscribe(data =>{
      console.log(data)
      if (data){
        alert("Zalogowano")
      }
     
    },
    (error) =>{
      alert("Zły login lub hasło")
    })
  }
}


