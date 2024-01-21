import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  constructor(private http: HttpClient) { }

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
  getHarvests(plantationId: number): Observable<any>{
    return this.http.post('http://localhost:8080/harvests/get-harvests?plantationId='+plantationId, {})
  }

  deletePlant(plantationId: number){
    this.http.post('http://localhost:8080/plantation/delete-plantation?id='+plantationId, {}).subscribe((data=>{
      alert('Usunięto')
      console.log(data)
    }))
  }
  deleteArea(SectorId: number){
    this.http.post('http://localhost:8080/plantation/delete-area?areaId='+SectorId, {}).subscribe((data=>{
      console.log(data)
    }))
  }
 
  deleteEmployee(plantationId: number, userId: number){
    this.http.post('http://localhost:8080/plantation/delete-plantation?plantationid='+plantationId +'&userId='+userId, {}).subscribe((data=>{
      alert('Usunięto')
      console.log(data)
    }))
  }

}
