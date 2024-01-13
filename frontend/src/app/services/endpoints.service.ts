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
    return this.http.get('http://localhost:8080/plantation/get-plantations')
  }

  getPlantationById(id: number): Observable<any> {
    return this.http.post('http://localhost:8080/plantation/get-plantation-by-id?id='+id, {})
     
  }
  

  // getPlantationById(id: number): Promise<any> {
  //   return this.http.post('http://localhost:8080/plantation/get-plantation-by-id?id='+id, {})
  //     .toPromise();
  // }
}
