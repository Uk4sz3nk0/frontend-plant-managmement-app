import {AfterViewInit, Component, ElementRef, Signal, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../services/login.service';
import {User} from "../services/auth-utils";

@Component({
  selector: 'app-owner-menu',
  templateUrl: './owner-menu.component.html',
  styleUrls: ['./owner-menu.component.css']
})
export class OwnerMenuComponent implements AfterViewInit {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @ViewChild('list') list!: ElementRef

  showElement: boolean = false;
  showPlants: boolean = true
  showDetails: boolean = false
  showSector: boolean = false

  pageTitle: string = 'Strona główna'

  public readonly user: Signal<User>;

  constructor(private route: ActivatedRoute, private router: Router, private log: LoginService,
              private _authService: LoginService) {
    this.user = this._authService.user;
  }

  menu() {
    this.sidenav.toggle()
  }

  plant() {
    console.log('plant')
    this.router.navigate(['/menu/map']).then();
    this.pageTitle='Dodaj plantację'
  }

  myPlant() {
    this.router.navigate(['/menu/list']).then();
    this.pageTitle='Twoje plantacje'
  }


  sec() {
    this.router.navigate(['/menu/seclist']).then();
    this.pageTitle='Pracownicy'
  }

  emp() {
    this.router.navigate(['/menu/employees']).then();
    this.pageTitle='plantacje'
  }

  harvest() {
    this.router.navigate(['/menu/harvest']).then();
    this.pageTitle='Zbiory'
  }

  userDetails() {
    this.router.navigate(['/menu/user-details']).then();
    this.pageTitle='Panel użytkownika'
  }

  logout() {
    this.log.logout()
  }


  ngAfterViewInit(): void {
    // console.log(this.list)
    this.route.params.subscribe(params => {
      const sec = params['param']
      if (sec === 'sectors') {
        this.showElement = false
        this.showPlants = false
        this.showDetails = false
        this.showSector = true

      }
    })
    //console.log(this.list.nativeElement)
    //  console.log("dasdfasdfas" +this.list.nativeElement.offsetWidth)
    //   console.log('aaaaaa')
    // this.renderer.setStyle(this.list.nativeElement, 'display', 'none')
  }
}
