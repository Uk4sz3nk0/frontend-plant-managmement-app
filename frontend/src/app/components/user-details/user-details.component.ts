import {Component, OnInit, Signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {User} from "../../services/auth-utils";
import {AuthenticationService} from "../../services/authentication.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BASE_URL, HARVEST, PLANTATION, USER_STATS} from "../../ApiCalls";
import {catchError, map} from "rxjs";

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
  public stats: Array<any> = [];

  constructor(private _loginService: AuthenticationService, private _httpClient: HttpClient) {
    this.user = this._loginService.user;
  }

  ngOnInit(): void {
    this.getStats();
    this.getFutureHarvests();
    this.getWorkedInPlantations();
  }

  private getStats(): void {
    const params = new HttpParams().set('userId', this.user().id);
    this._httpClient.post(BASE_URL + USER_STATS + '/get-stats-by-user', {
      "page": 0,
      "size": 100,
      "sortColumn": "id",
      "sortDirection": "ASC"
    }, {params: params}).subscribe({
      next: response => {
        console.log(response)

      },
      error: err => console.error(err)
    })
  }

  private getWorkedInPlantations(): void {
    this._httpClient.post(BASE_URL + PLANTATION + '', {})
  }

  private getFutureHarvests(): void {
    this._httpClient.post(BASE_URL + HARVEST + '/get-future-harvests', {}).subscribe({
      next: response => {
        // console.log(response);
        const harvests = response as any[];
        harvests.forEach(harvest => {
          // this.getPlantationName(harvest.id).subscribe(plantationName => {
          //   console.log(plantationName)
          // })
          console.log(harvest)
        })
      },
      error: err => console.error(err)
    })
  }

  private getPlantationName(userHarvestId: number): any {
    const params = new HttpParams().set('id', userHarvestId)
    return this._httpClient.post(BASE_URL + PLANTATION + '/get-plantation-by-id', {}, {params: params}).pipe(
      map(response => response['plantationName']),
      catchError(error => {
        console.error(error);
        throw error;  // Rzucanie błędu w przypadku niepowodzenia
      })
    );
  }

}
