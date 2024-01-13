import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Plantation} from '../interfaces/plantation';

@Injectable({
  providedIn: 'root'
})
export class AddAreaService {

  area: Plantation["area"] = {
    id: null,
      name: 'string',
      polygonColor: 'string',
      coordinates: [
        {
          id: null,
          latitude: 0,
          longitude: 0
        }
      ],
      isMainArea: true
  }

  constructor(private http: HttpClient) { }

  addArea(id: number, coords: any){
    

  }
}
