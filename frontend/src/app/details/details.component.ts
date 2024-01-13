import { Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EndpointsService } from '../services/endpoints.service';


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

  lat0 = 50
  lat1 = 50.01
  lng0 = 20
  lng1 = 20.01
  
  data: any = ''
  details: any = ''
  
  constructor(private ngZone: NgZone, private renderer: Renderer2, private router: Router, private route: ActivatedRoute, private endpoint: EndpointsService) { }

  

  ngOnInit() {

    this.route.params.subscribe(params =>{
      const id = params['id']
      console.log(id)
      this.data = id



      
      
    })

    console.log('aaaaaaaaaa')

    this.endpoint.getPlantationById(this.data).subscribe((plant: any) =>{
      console.log(plant)
      console.log(plant.area.coordinates[0])
      this.details = plant
      this.lat0 = plant.area.coordinates[0].latitude
      this.lat1 = plant.area.coordinates[1].latitude
      this.lng0 = plant.area.coordinates[0].longitude
      this.lng1 = plant.area.coordinates[2].longitude
       



      this.loadMap();
      this.addPolygon()
      const stat = document.getElementById('statystyki')
      console.log(this.statystyki)
      console.log(stat)
      const text = this.renderer.createText('plantacja');
      this.renderer.appendChild(stat, text)

    })

//     const id = 2; // Twój identyfikator
// this.endpoint.getPlantationById(id).then(response => {
//   console.log(response);
// });
  

    
  }

  loadMap() {
    const centerLat = (this.lat1 - this.lat0) / 2 + this.lat0
    const centerLng = (this.lng1 - this.lng0) / 2 + this.lng0



    const mapOptions: google.maps.MapOptions = {
      center: { lat: centerLat, lng: centerLng },
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
        { lat: this.lat0, lng: this.lng0 },
        { lat: this.lat1, lng: this.lng0 },
        { lat: this.lat1, lng: this.lng1 },
        { lat: this.lat0, lng: this.lng1},
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
      this.router.navigate(['/sectors'])
            .then(() => {
        window.location.reload()
      })
      // window.location.reload()

      // this.router.navigate(['/home', {param: 'sectors'}])
      // .then(() => {
      //   window.location.reload()
      // })
      
    });

    this.polygons.push(polygon);
  }

}
