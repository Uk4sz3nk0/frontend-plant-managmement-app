import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sectors-form',
  templateUrl: './sectors-form.component.html',
  styleUrl: './sectors-form.component.css'
})
export class SectorsFormComponent implements OnInit{
  map!: google.maps.Map;
  polygons: google.maps.Polygon[] = [];
  num: any;
  posA: number = 50;
  posB: number = 50.01;
  posC: number = 20;
  posD: number = 20.01;

  constructor(private ngZone: NgZone, private router: Router) { }

  ngOnInit() {
    this.loadMap();
    this.addPolygon(false, false, '#FFFFFF')




  }


  sectors(){
    console.log(this.num)

    const x =(this.posB-this.posA)/this.num
    const y = this.posA + x
    this.posB = y

    // const a =(this.posD-this.posC)/this.num
    // const b = this.posC + a
    // this.posD = b

    for(var i=0; i < this.num; i++){
      this.addPolygon(true, true, '#'+Math.floor(Math.random()*16777215).toString(16))
    }
  }

  save(){
  alert('Sektory zostały zapisane')
  this.router.navigate(['/list'])
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
        { lat: this.posA, lng: this.posC },
        { lat: this.posB, lng: this.posC },
        { lat: this.posB, lng: this.posD },
        { lat: this.posA, lng: this.posD },
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
    console.log(color)
  }
}
