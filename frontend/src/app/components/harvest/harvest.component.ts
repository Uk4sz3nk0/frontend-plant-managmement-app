import {Component, OnInit, NgZone} from '@angular/core';
import {HarvestDto, HarvestsService, UserHarvestDto} from "../../core/harvests";
import {PlantDto, PlantsService} from "../../core/plants";
import {PlantationService} from "../../core/plantations";
import {LoginService} from "../../services/login.service";
import {UserStatsService} from "../../core/user-stats";
import {map} from "rxjs";
import { EndpointsService } from '../../services/endpoints.service';
import { DetailsComponent } from 'src/app/details/details.component';


@Component({
  selector: 'app-harvest',
  templateUrl: './harvest.component.html',
  styleUrl: './harvest.component.css'
})
export class HarvestComponent implements OnInit {


  map!: google.maps.Map;
  label!: google.maps.InfoWindow;
  polygons: google.maps.Polygon[] = [];


  lat0 = 50
  lat1 = 50.01
  lng0 = 20
  lng1 = 20.01
  
  data: any = ''
  details: any = ''
  sectorsnumber: number
  employeesnumber: number
  name: string
  


  public plantations: Array<any> = [];
  public plantationSectors: Array<any> = [];
  public userHarvestForHarvest: Array<UserHarvestDto> = [];
  public plantType: number = 0;
  plantTypes: number[] = [];
  public plants: Array<Array<PlantDto>> = [];
  public sectors: Array<Array<any>> = [];
  public employees: Array<any> = [];
  public harvests: Array<HarvestDto> = [];
  public dateRange = {
    start: this.formatDate(new Date()),
    end: this.formatDate(new Date(new Date().setDate(new Date().getDate() + 5)))
  }
  public plantationId: number;
  public pagination = {
    page: 0,
    totalPages: 0
  }
  public leftButton: boolean = true;
  public rightButton: boolean = true;
  public userHarvests: Array<UserHarvestDto>;
  public todayPlantationId: number

  public harvestModel: HarvestDto = {
    date: this.setDateAsString(),
    plantationId: null,
    priceForFullContainer: null,
  }

  constructor(private _harvestsService: HarvestsService, private _plantsService: PlantsService,
              private _plantationService: PlantationService, private _loginService: LoginService,
              private _statsService: UserStatsService, private endpoint: EndpointsService, private ngZone: NgZone) {

  }

  ngOnInit(): void {
    this.getPlantations();
    this.getHarvests();
    console.log(this.plantations)

    

  }


  
getPlantById(id: number){

  this.endpoint.getPlantationById(id).subscribe((plant: any) =>{
    console.log(plant)

    console.log('sektory:' + plant.sectors.length)
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
   this.addPolygon(false, false, '#ffffff')
   this.sectors1()


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
  console.log(mapElement)

}



sectors1(){
  console.log(this.details.sectors.length)
  
  for(var i=0; i < this.details.sectors.length; i++){

    this.lat0 = this.details.sectors[i].coordinates[0].latitude
    this.lat1 = this.details.sectors[i].coordinates[1].latitude
    this.lng0 = this.details.sectors[i].coordinates[0].longitude
    this.lng1 = this.details.sectors[i].coordinates[2].longitude

  this.addPolygon(false, false, '#'+Math.floor(Math.random()*16777215).toString(16))
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





  public deleteUserHarvest(index: number): void {
    this.userHarvestForHarvest.splice(index, 1);
    this.plants.splice(index, 1);
    this.sectors.splice(index, 1);
  }

  public saveHarvest(): void {
    this.userHarvestForHarvest.forEach(uh => uh.plantationId = this.harvestModel.plantationId);
    this.harvestModel.userHarvests = this.userHarvestForHarvest;
    this.harvestModel.season = parseInt(this.harvestModel.date.split('-')[0]);
    if (!this.harvestModel.id) {
      this._harvestsService.addHarvest(this.harvestModel).subscribe({
        next: () => {
          alert('Harvest added');
          this.clearHarvestData();
        },
        error: err => {
          console.error(err);
          alert('Wystąpił błąd podczas zapisu zbioru')
        }
      })
    } else {
      this._harvestsService.editHarvest(this.harvestModel).subscribe({
        next: () => {
          alert('Harvest edited');
          this.clearHarvestData();
        },
        error: err => {
          console.error(err);
          alert('Wystąpił błąd podczas zapisu zbioru')
        }
      })
    }
    console.log(this.harvestModel)
  }

  private clearHarvestData(): void {
    this.harvestModel = {
      date: this.setDateAsString(),
      plantationId: null,
      priceForFullContainer: null,
    }
    this.userHarvestForHarvest = [];
    this.plants = [];
    this.sectors = [];
  }

  public addEmptyUserHarvest(): void {
    
    this.userHarvestForHarvest.push({
      plantId: null,
      row: null,
      userId: null,
      sectorId: null,
    });
    console.log(this.userHarvestForHarvest)
    this.getPlants(this.userHarvestForHarvest.length - 1);
  }

  public getPlants(index: number): void {
    this._plantsService.getPlantsByType(this.plantType, {
      page: 0,
      size: 1000,
      sortDirection: 'ASC',
      sortColumn: 'id'
    }).subscribe({
      next: responsePlants => {
        console.log(responsePlants.data)
        this.plants[index] = responsePlants.data;
        this.userHarvestForHarvest[index].plantId = responsePlants.data[0].id;
      },
      error: error => console.error(error)
    })
  }

  

  public getEmployees(): void {
    console.log('aaaaaaaaaaaaa')
      // @ts-ignore
    this._plantationService.getEmployees(this.harvestModel.plantationId.id).subscribe({
      next: response => {
        this.employees = response;
        console.log(response)
      },
      error: err => console.error(err)
    })
  }

  public changePlantation(): void {
   // console.log(this.harvestModel.plantationId.sectors)
   
    console.log(this.harvestModel.plantationId);

    // @ts-ignore
  console.log(this.harvestModel.plantationId.sectors)

      
      this.plantationSectors=[]
      // @ts-ignore
    for(var i = 0; i< this.harvestModel.plantationId.sectors.length;i++){
       // @ts-ignore
      this.plantationSectors.push(this.harvestModel.plantationId.sectors[i])
    }
   // this.plantationSectors = this.plantations.find(p => p.id === this.harvestModel.plantationId).sectors;
    // this.plantationSectors = this.harvestModel.plantationId
  console.log(this.plantationSectors)
    this.getEmployees();
    // console.log(this.getEmployees())
  }

  private getPlantations(): void {
    if (this._loginService.user().role.name == 'ROLE_OWNER') {
      this._plantationService.getPlantationsByUser(this._loginService.user().id).subscribe({
        next: response => {
          this.plantations = response;
          this.plantationSectors = this.plantations[0].sectors
          this.todayPlantationId = response[0].id
        },
        error: err => console.error(err)
      })
    } else {
      this._plantationService.getUserWorkedInPlantations().subscribe({
        next: response => {
          this.plantations = response;
          this.plantationSectors = this.plantations[0].sectors
          this.todayPlantationId = response[0].id
          this.getTodayUserHarvest();
        },
        error: err => console.error(err)
      })
    }
  }

  private setDateAsString(): string {
    const date: Date = new Date();
    return `${date.getFullYear()}.${date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1}.${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
  }

  public getHarvests(): void {
    this._harvestsService.getHarvestsInDateRange(this.plantationId, this.dateRange.start, this.dateRange.end, {
      page: this.pagination.page,
      size: 10,
      sortColumn: 'date',
      sortDirection: 'DSC'
    }).subscribe({
      next: response => {
        console.log(response)
        this.harvests = response.data;
        this.pagination.totalPages = response.page.totalPages;
        this.calcPagination()
      },
      error: err => console.error(err)
    })
  }

  public changePageInHarvests(page: number): void {
    this.pagination.page = page;
    this.calcPagination()
    if (this.plantationId) {
      this.getHarvests();
    }
  }

  public getPlantationName(id: number): string {
    return this.plantations.find(p => p.id == id).name;
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  public formatDateFromArray(date: any): string {
    return `${date[0]}-${date[1] < 10 ? '0' + date[1] : date[1]}-${date[2] < 10 ? '0' + date[2] : date[2]}`;

  }

  public editHarvest(id: number): void {
    this.clearHarvestData();
    const editedHarvest = this.harvests.find(h => h.id === id);
    console.log(editedHarvest)
    this.harvestModel = {
      date: this.formatDate(new Date(this.formatDateFromArray(editedHarvest.date))),
      priceForFullContainer: editedHarvest.priceForFullContainer,
      id: editedHarvest.id,
      plantationId: editedHarvest.plantationId,
      season: editedHarvest.season,
    }
    this.userHarvestForHarvest = editedHarvest.userHarvests
    editedHarvest.userHarvests.forEach((h, index) => {
      this.getPlants(index);
    })
    this.getEmployees()
  }

  public deleteHarvest(id: number): void {
    if (confirm(`Czy na pewno chcesz usunąć zbiory o id ${id}?`)) {
      this._harvestsService.deleteHarvest(id).subscribe({
        next: () => {
          alert(`Zbiór o id ${id} został pomyślnie usunięty`);
          this.getHarvests();
        },
        error: err => console.error(err)
      })
    }
  }

  public canEditHarvest = (date: any): boolean => new Date() < new Date(this.formatDateFromArray(date));


  private calcPagination(): void {
    this.leftButton = !((this.pagination.page - 1) >= 0);
    this.rightButton = !((this.pagination.page + 1) < this.pagination.totalPages);
  }

  public getTodayUserHarvest(): void {
    this._harvestsService.getUserHarvestByDate(this.formatDate(new Date()), this.todayPlantationId).subscribe({
      next: response => {
        console.log(response)
        this.userHarvests = response
      },
      error: err => console.error(err)
    })
    this.getPlantById(this.todayPlantationId)
  }

  public startUserHarvest(id: number): void {
    this._harvestsService.startUserHarvest(id).subscribe({
      next: () => {
        alert('Rozpoczęto zbiór');
        this.getTodayUserHarvest();
      }
    })
  }

  public reportCollectedContainer(id: number): void {
    this._statsService.reportCollected(this._loginService.user().id, id).subscribe({
      next: () => {
        alert('Zgłoszono skrzynkę');
      }
    })
  }

  public endUserHarvest(id: number): void {
    this._harvestsService.endUserHarvest(id).subscribe({
      next: () => {
        alert('Zakończono zbiór');
        this.getTodayUserHarvest();
      }
    })
  }
}
