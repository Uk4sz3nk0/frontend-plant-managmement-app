import {Component, OnInit, Signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {User} from "../../services/auth-utils";
import {AuthenticationService} from "../../services/authentication.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BASE_URL, USER_STATS} from "../../ApiCalls";

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
  public stats: Array<any>;

  constructor(private _loginService: AuthenticationService, private _httpClient: HttpClient) {
    this.user = this._loginService.user;
  }

  ngOnInit(): void {
    this.getStats()
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
        // @ts-ignore
        this.stats = response.data
      },
      error: err => console.error(err)
    })
  }

}
