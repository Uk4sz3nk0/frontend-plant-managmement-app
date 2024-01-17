import {Component, OnInit, Signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {User} from "../../services/auth-utils";
import {AuthenticationService} from "../../services/authentication.service";
import {HttpClient} from "@angular/common/http";
import {forkJoin, map, Observable} from "rxjs";
import {PlantationService} from "../../core/plantations";
import {HarvestsService} from "../../core/harvests";
import {UserStatsService} from "../../core/user-stats";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {

  public readonly user: Signal<User>;
  public workedInPlantations: Array<any> = [];
  public futureHarvests: Array<any> = [];
  public userStats: Array<any> = [];

  constructor(private _loginService: AuthenticationService, private _httpClient: HttpClient, private _plantationsService: PlantationService,
              private _harvestService: HarvestsService, private _userStatsService: UserStatsService) {
    this.user = this._loginService.user;
  }

  ngOnInit(): void {
    this.getStats();
    this.getFutureHarvests();
    this.getWorkedInPlantations();
  }

  private getStats(): void {
    this.userStats = [];
    this._userStatsService.getStatsByUser(this.user().id, {
      page: 0,
      size: 100,
      sortColumn: 'id',
      sortDirection: 'ASC'
    }).subscribe(response => {
      // forkJoin, aby poczekać na zakończenie wszystkich asynchronicznych operacji
      const harvestObservables = response.data.map(stats => this.getHarvestById(stats.harvestId));

      forkJoin(harvestObservables).subscribe(harvests => {
        for (let i = 0; i < response.data.length; i++) {
          const stats = response.data[i];
          const harvest = harvests[i];

          this._plantationsService.getPlantationById(harvest.plantationId).subscribe(plantation => {
            console.log(`There is plantation: ${plantation.name} and harvest object ${harvest.season}`);
            this.userStats.push({
              season: harvest.season,
              plantation: plantation.name,
              collectedContainers: stats.collectedContainers,
              earned: stats.collectedContainers * harvest.priceForFullContainer
            });
          });
        }
      });
    });
  }

  private getHarvestById(harvestId: number): Observable<any> {
    return this._harvestService.getHarvestById(harvestId).pipe(map(harvest => {
      return harvest;
    }));
  }

  private getWorkedInPlantations(): void {
    this._plantationsService.getUserWorkedInPlantations().subscribe(response => {
      this.workedInPlantations = response;
    })
  }

  private getFutureHarvests(): void {
    this.futureHarvests = [];
    this._harvestService.getFutureHarvests().subscribe(response => {
      console.log(response)
      response.forEach(harvest => {
        this.getPlantationName(harvest.plantationId).subscribe(name => {
          this.futureHarvests.push({
            date: `${harvest['date'][0]}.${parseInt(harvest['date'][1]) < 10 ? '0' + harvest['date'][1] : harvest['date'][1]}.${parseInt(harvest['date'][2]) < 10 ? '0' + harvest['date'][2] : harvest['date'][2]}`,
            plantationName: name
          })
        })
      })
    })
  }

  private getPlantationName(plantationId: number): Observable<any> {
    return this._plantationsService.getPlantationById(plantationId).pipe(map((plantation) => {
      return plantation.name;
    }));
  }

}
