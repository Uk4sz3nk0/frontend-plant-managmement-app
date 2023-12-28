import { Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-sectors-form',
  templateUrl: './sectors-form.component.html',
  styleUrl: './sectors-form.component.css'
})
export class SectorsFormComponent implements OnInit{
  map!: google.maps.Map;
  polygons: google.maps.Polygon[] = [];
  num: any;

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    this.loadMap();
    this.addPolygon(false, false, 'green')


    
    
  }

  sectors(){
    console.log(this.num)
    for(var i=0; i < this.num; i++){
      this.addPolygon(true, true, 'blue')
    }
  }

  save(){
  alert('Sektory zostały zapisane')
  }

  loadMap() {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 50, lng: 20 },
      zoom: 15
    };

    

    const mapElement = document.getElementById('map')!;

    this.map = new google.maps.Map(mapElement, mapOptions);

    // Dodaj obsługę przeciągania mapy

  }

  // Funkcja do dodawania wielokątów
  addPolygon(edit: boolean, drag: boolean, color: string ) {
    const polygon = new google.maps.Polygon({
      map: this.map,
     editable: edit, // Ustawienie na true umożliwia edycję wielokąta
      draggable: drag, // Ustawienie na true umożliwia przeciąganie wielokąta
      paths: [
        { lat: 50, lng: 20 },
        { lat: 50.01, lng: 20 },
        { lat: 50.01, lng: 20.01 },
        { lat: 50, lng: 20.01 },
      ],
      strokeColor: '#00FF00',
      fillColor: color
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
