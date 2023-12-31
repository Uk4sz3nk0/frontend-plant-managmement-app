import { Component, NgZone, OnInit } from '@angular/core';

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

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    this.loadMap();
    this.addPolygon()
    
  }

  loadMap() {

    const centerLat = (this.lat1 - this.lat0) / 2 + this.lat0
    const centerLng = (this.lng1 - this.lng0) / 2 + this.lng0

    const mapOptions: google.maps.MapOptions = {
      center: { lat: centerLat, lng: centerLng },
      zoom: 15
    };

    

    const mapElement = document.getElementById('map')!;

    this.map = new google.maps.Map(mapElement, mapOptions);

    // Dodaj obsługę przeciągania mapy

  }

  // Funkcja do dodawania wielokątów
  addPolygon() {
    const polygon = new google.maps.Polygon({
      map: this.map,
     editable: true, // Ustawienie na true umożliwia edycję wielokąta
      draggable: true, // Ustawienie na true umożliwia przeciąganie wielokąta
      paths: [
        { lat: this.lat0, lng: this.lng0 },
        { lat: this.lat1, lng: this.lng0 },
        { lat: this.lat1, lng: this.lng1 },
        { lat: this.lat0, lng: this.lng1},
      ],
      strokeColor: '#00FF00',
      fillColor: '#00FF00'
    });

    // Dodaj obsługę przeciągania wielokąta
    google.maps.event.addListener(polygon, 'dragend', () => {
      this.ngZone.run(() => {
        const coordinates = polygon.getPath().getArray().map((latLng: any) => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
        // Tutaj możesz obsługiwać przeciąganie wielokąta, np. zapisując nowe współrzędne
        console.log('Wielokąt przeciągnięty!', coordinates);
      });
    });

    this.polygons.push(polygon);
  }
}

