import {Component, OnInit} from '@angular/core';
import {HarvestDto, HarvestsService, UserHarvestDto} from "../../core/harvests";
import {PlantDto, PlantsService} from "../../core/plants";
import {PlantationService} from "../../core/plantations";
import {LoginService} from "../../services/login.service";
import {UserStatsService} from "../../core/user-stats";
import {map} from "rxjs";


@Component({
  selector: 'app-harvest',
  templateUrl: './harvest.component.html',
  styleUrl: './harvest.component.css'
})
export class HarvestComponent implements OnInit {

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
              private _statsService: UserStatsService) {

  }

  ngOnInit(): void {
    this.getPlantations();
    this.getHarvests();
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
        this.plants[index] = responsePlants.data;
        this.userHarvestForHarvest[index].plantId = responsePlants.data[0].id;
      },
      error: error => console.error(error)
    })
  }

  public getEmployees(): void {
    this._plantationService.getEmployees(this.harvestModel.plantationId).subscribe({
      next: response => {
        this.employees = response;
      },
      error: err => console.error(err)
    })
  }

  public changePlantation(): void {
    this.plantationSectors = this.plantations.find(p => p.id === this.harvestModel.plantationId).sectors;
    this.getEmployees();
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
