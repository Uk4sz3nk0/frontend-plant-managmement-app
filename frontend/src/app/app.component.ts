import {Component, OnInit} from '@angular/core';
import {LoginService} from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private _authService: LoginService) {
  }

  ngOnInit(): void {
    this._authService.autoLogin();
  }


}
