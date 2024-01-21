import { Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EndpointsService } from '../services/endpoints.service';
import {PlantationService} from "../core/plantations";


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
  sectorsnumber: number
  employeesnumber: number
  name: string
  
  constructor(private ngZone: NgZone, private renderer: Renderer2, private router: Router, private route: ActivatedRoute, 
    private endpoint: EndpointsService, private _plantationService: PlantationService) { }


  ngOnInit() {

    this.route.params.subscribe(params =>{
      const id = params['id']
      console.log(id)
      this.data = id
    })

    this.endpoint.getPlantationById(this.data).subscribe((plant: any) =>{
      this.name = plant.name
      this.sectorsnumber = plant.sectors.length
      this.employeesnumber = plant.employeeIds.length
      console.log(plant.area.coordinates[1])
      this.details = plant
      this.lat0 = plant.area.coordinates[0].latitude
      this.lat1 = plant.area.coordinates[1].latitude
      this.lng0 = plant.area.coordinates[0].longitude
      this.lng1 = plant.area.coordinates[2].longitude
       
      this.loadMap();
      this.addPolygon(false, false, '#00FF00')
      this.sectorsCoords()

    })


  }

  loadMap() {
    const centerLat = (this.lat1 - this.lat0) / 2 + this.lat0
    const centerLng = (this.lng1 - this.lng0) / 2 + this.lng0

    const mapOptions: google.maps.MapOptions = {
      center: { lat: centerLat, lng: centerLng },
      zoom: 15,
  
    };


    const mapElement = document.getElementById('map')!;

    this.map = new google.maps.Map(mapElement, mapOptions);

  }

  sectorsCoords(){
    console.log(this.details.sectors.length)
    
    for(var i=0; i < this.details.sectors.length; i++){

      this.lat0 = this.details.sectors[i].coordinates[0].latitude
      this.lat1 = this.details.sectors[i].coordinates[1].latitude
      this.lng0 = this.details.sectors[i].coordinates[0].longitude
      this.lng1 = this.details.sectors[i].coordinates[2].longitude

     this.addPolygon(false, false, '#'+Math.floor(Math.random()*16777215).toString(16))
    }
  }

  delete(){
    if(this.details.employeeIds.length == 0){

    
    this._plantationService.deletePlantation(this.data).subscribe({
      next: () => {
        this.router.navigate(['menu/list'])
      },
      error: er => console.error(er)
    })
  }else{
    alert("Przed usunięciem plantacji należy usunąć wszystkich pracowników do niej przypisanych")
  }
  }

  addPolygon(edit: boolean, drag: boolean, color: string) {
    const polygon = new google.maps.Polygon({
      map: this.map,
     editable: edit, // Ustawienie na true umożliwia edycję wielokąta
      draggable: drag, // Ustawienie na true umożliwia przeciąganie wielokąta
      paths: [
        { lat: this.lat0, lng: this.lng0 },
        { lat: this.lat1, lng: this.lng0 },
        { lat: this.lat1, lng: this.lng1 },
        { lat: this.lat0, lng: this.lng1},
      ],
      strokeColor: '#00FF00',
      fillColor: color,
      
    });

    google.maps.event.addListener(polygon, 'dragend', () => {
      this.ngZone.run(() => {
        const coordinates = polygon.getPath().getArray().map((latLng: any) => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      
      });
    });

    const infoWindow = new google.maps.InfoWindow({
      content: 'Kliknij obszar plantacji aby ustawić nowe sektory'
    });
    
    google.maps.event.addListener(polygon, 'mouseover', (event: any) =>{

      infoWindow.setPosition(event.latLng)
      infoWindow.open(this.map)
    })

    google.maps.event.addListener(polygon, 'mouseout', () => {
      infoWindow.close();
    });

    google.maps.event.addListener(polygon, 'mousedown', () => {
      this.router.navigate(['/menu/sectors', this.details.id])
            .then(() => {
        window.location.reload()
      })
      
    });

    this.polygons.push(polygon);
  }

}