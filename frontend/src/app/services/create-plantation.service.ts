import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Plantation} from '../interfaces/plantation';

@Injectable({
  providedIn: 'root'
})
export class CreatePlantationService {

  plant: Plantation = {
    name: '',
    city: '',
    street: '',
    houseNumber: 0,
    id: null,
    nip: '',
    regon: 'string',
    flatNumber: 0,
    postCode: '11-111',
    area: {
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
    },
    sectors: [
      {
        id: null,
        name: 'string',
        polygonColor: 'string',
        coordinates: [
          {
            id: null,
            latitude: 0,
            longitude: 0,
          }
        ],
        isMainArea: true
      }
    ],
    ownerId: null,
    employeeIds: [
      0
    ]
  }

  constructor(private http: HttpClient) {
  }

  create(name: string, fruit: string, city: string, street: string, housenumber: number) {
    this.plant.name = name
    this.plant.city = city
    this.plant.street = street
    this.plant.houseNumber = housenumber
    // this.plant.area.coordinates = coordinates
    this.http.post('http://localhost:8080/plantation/create-plantation', this.plant).subscribe(data => {
      console.log(data)
      alert("Plantacja została utworzona")
    })
  }
}
