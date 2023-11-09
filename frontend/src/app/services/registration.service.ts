import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  register(firstname: string, lastname: string, email: string, password: string, role: string){
    const user = { "firstName": firstname, "lastName": lastname, "email": email, "password": password, "role": role}  
    this.http.post('http://localhost:8080/auth/register', user).subscribe(data =>{
      console.log(data)
      alert("Konto zostało utworzone")
    })
  }
}
