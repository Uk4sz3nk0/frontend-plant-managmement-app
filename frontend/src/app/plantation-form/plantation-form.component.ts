import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, NgForm} from '@angular/forms';
import {CreatePlantationService} from '../services/create-plantation.service';
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-plantation-form',
  templateUrl: './plantation-form.component.html',
  styleUrls: ['./plantation-form.component.css']
})
export class PlantationFormComponent implements OnInit {


  map!: google.maps.Map;
  polygons: google.maps.Polygon[] = [];

  lat0 = 50
  lat1 = 50.01
  lng0 = 20
  lng1 = 20.01

  defaultFruit: string = 'one'

   coordinatesArray: any


  formData = {
    name: '',
    city: '',
    street: '',
    housenumber: 0
  }

  constructor(private ngZone: NgZone, private formBuilder: FormBuilder, private createplant: CreatePlantationService,
              private _loginService: LoginService) {
  }


  ngOnInit() {
    this.loadMap();
    this.addPolygon()


  }

  loadMap() {

    const centerLat = (this.lat1 - this.lat0) / 2 + this.lat0
    const centerLng = (this.lng1 - this.lng0) / 2 + this.lng0

    const mapOptions: google.maps.MapOptions = {
      center: {lat: centerLat, lng: centerLng},
      zoom: 15
    };

    const mapElement = document.getElementById('map')!;

    this.map = new google.maps.Map(mapElement, mapOptions);

  }

  addPolygon() {
    const polygon = new google.maps.Polygon({
      map: this.map,
      editable: true, 
      draggable: true, 
      paths: [
        {lat: this.lat0, lng: this.lng0},
        {lat: this.lat1, lng: this.lng0},
        {lat: this.lat1, lng: this.lng1},
        {lat: this.lat0, lng: this.lng1},
      ],
      strokeColor: '#00FF00',
      fillColor: '#00FF00'
    });

    google.maps.event.addListener(polygon, 'dragend', () => {
      this.ngZone.run(() => {
        const coordinates = polygon.getPath().getArray().map((latLng: any) => {
          return {latitude: latLng.lat(), longitude: latLng.lng()};
        });
      
        this.coordinatesArray = coordinates
      });
    });

    this.polygons.push(polygon);
  }

  save() {
    this.createplant.create(this.formData.name, "blueberry", this.formData.city, this.formData.street, this.formData.housenumber, this.coordinatesArray)
  }

  debug(formularz: NgForm): void {
    console.log('Stan formularza:', formularz.form.valid);
  }

}