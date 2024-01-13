import { Component, NgZone, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EndpointsService } from '../services/endpoints.service';

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


  data: any
  plant!: number;

  constructor(private ngZone: NgZone, private router: Router, private route: ActivatedRoute, private endpoint: EndpointsService) { }

  ngOnInit() {

    this.route.params.subscribe(params =>{
      const id = params['id']
      console.log(id)
      this.data = id



      
      
    })

    this.endpoint.getPlantationById(this.data).subscribe((plant: any) =>{
      console.log(plant)
      console.log(plant.area.coordinates[0])


      this.posA = plant.area.coordinates[0].latitude
      this.posB = plant.area.coordinates[1].latitude
      this.posC = plant.area.coordinates[0].longitude
      this.posD = plant.area.coordinates[2].longitude
       

      this.loadMap();
      this.addPolygon(false, false, '#FFFFFF')


    })




    





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

    const centerLat = (this.posB - this.posA) / 2 + this.posA
    const centerLng = (this.posD - this.posC) / 2 + this.posC

    const mapOptions: google.maps.MapOptions = {
      center: { lat: centerLat, lng: centerLng },
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
