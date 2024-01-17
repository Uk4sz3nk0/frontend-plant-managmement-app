import {Component, OnInit} from '@angular/core';
import {HarvestDto, HarvestsService, UserHarvestDto} from "../../core/harvests";
import {PlantDto, PlantsService} from "../../core/plants";
import {PlantationService} from "../../core/plantations";
import {LoginService} from "../../services/login.service";


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
  public plants: Array<Array<PlantDto>> = [];
  public sectors: Array<Array<any>> = [];
  public employees: Array<any> = [];
  public harvestModel: HarvestDto = {
    date: this.setDateAsString(),
    plantationId: null,
    priceForFullContainer: null,
  }

  constructor(private _harvestsService: HarvestsService, private _plantsService: PlantsService,
              private _plantationService: PlantationService, private _loginService: LoginService) {

  }

  ngOnInit(): void {
    this.getPlantations();
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
    this._harvestsService.addHarvest(this.harvestModel).subscribe({
      next: () => alert('Harvest added'),
      error: err => console.error(err)
    })
    console.log(this.harvestModel)
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
      next: responsePlants => this.plants[index] = responsePlants.data,
      error: error => console.error(error)
    })
  }

  public getEmployees(): void {
    this._plantationService.getEmployees(this.harvestModel.plantationId).subscribe({
      next: response => {
        console.log(response)
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
    this._plantationService.getPlantationsByUser(this._loginService.user().id).subscribe({
      next: response => {
        this.plantations = response;
        this.plantationSectors = this.plantations[0].sectors
      },
      error: err => console.error(err)
    })
  }

  private setDateAsString(): string {
    const date: Date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
  }


}
