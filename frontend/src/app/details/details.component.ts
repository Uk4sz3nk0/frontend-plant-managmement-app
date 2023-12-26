import { Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {


  map!: google.maps.Map;
  label!: google.maps.InfoWindow;
  polygons: google.maps.Polygon[] = [];
  @ViewChild('statystyki') statystyki!: ElementRef
  
  
  constructor(private ngZone: NgZone, private renderer: Renderer2, private router: Router) { }

  ngOnInit() {
    this.loadMap();
    this.addPolygon()
    const stat = document.getElementById('statystyki')
    console.log(this.statystyki)
    console.log(stat)
    const text = this.renderer.createText('plantacja');
    this.renderer.appendChild(stat, text)
    
  }

  loadMap() {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 50, lng: 20 },
      zoom: 15,
      // gestureHandling: 'none'
    };

    

    const mapElement = document.getElementById('map')!;

    this.map = new google.maps.Map(mapElement, mapOptions);

    // Dodaj obsługę przeciągania mapy

  }

  // Funkcja do dodawania wielokątów
  addPolygon() {
    const polygon = new google.maps.Polygon({
      map: this.map,
     editable: false, // Ustawienie na true umożliwia edycję wielokąta
      draggable: false, // Ustawienie na true umożliwia przeciąganie wielokąta
      paths: [
        { lat: 50, lng: 20 },
        { lat: 50.01, lng: 20 },
        { lat: 50.01, lng: 20.01 },
        { lat: 50, lng: 20.01 },
      ],
      strokeColor: '#00FF00',
      fillColor: '#00FF00',
      
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

    const infoWindow = new google.maps.InfoWindow({
      content: 'Kliknij obszar plantacji aby ustawić sektory'
    });
    
    google.maps.event.addListener(polygon, 'mouseover', (event: any) =>{

      // this.label.setPosition(event.latLng)
      // this.label.open(this.map)
      infoWindow.setPosition(event.latLng)
      infoWindow.open(this.map)
      console.log(this.map)
    })

    google.maps.event.addListener(polygon, 'mouseout', () => {
      infoWindow.close();
    });

    google.maps.event.addListener(polygon, 'mousedown', () => {
      // window.location.reload()
      this.router.navigate(['/sectors'])
      .then(() => {
        window.location.reload()
      })
      
    });

    this.polygons.push(polygon);
  }

}
