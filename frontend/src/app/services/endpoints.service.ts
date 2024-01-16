import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  constructor(private http: HttpClient) { }

  // getPlantations(): Promise<any> {
  //   return this.http.get('http://localhost:8080/plantation/get-plantations').pipe(
  //     map(response => response)  // Zmodyfikuj to zgodnie z rzeczywistą strukturą danych
  //   ).toPromise();
  // }
  getPlantations(): Observable<any> {
    return this.http.post('http://localhost:8080/plantation/get-plantations-by-user?userId=2', {})
  }

  getPlantationById(id: number): Observable<any> {
    return this.http.post('http://localhost:8080/plantation/get-plantation-by-id?id='+id, {})
     
  }

  getAreasByPlantation(id: number): Observable<any> {
    return this.http.post('http://localhost:8080/plantation/get-areas-by-plantation?plantationId='+id, {})
  }

  getEmployees(id: number): Observable<any> {
    return this.http.post('http://localhost:8080/plantation/get-employees?plantationId='+id, {})
  }

  getEmployeeByEmail(email: string): Observable<any> {
    return this.http.post('http://localhost:8080/users/search-employee-by-email?searchPhrase='+email, {})
  }
  addEmployeeToPlant(plantationId: number, userId: number){
    this.http.post('http://localhost:8080/plantation/add-employe?plantationId='+plantationId+'&userId='+userId, {}).subscribe((data=>{
      alert('Dodano')
      console.log(data)
    }))
  }


  

  // getPlantationById(id: number): Promise<any> {
  //   return this.http.post('http://localhost:8080/plantation/get-plantation-by-id?id='+id, {})
  //     .toPromise();
  // }
}
