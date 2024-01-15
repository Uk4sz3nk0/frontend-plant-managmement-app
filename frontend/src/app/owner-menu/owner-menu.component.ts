import {AfterViewInit, Component, ElementRef, Renderer2, Signal, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
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

  public readonly user: Signal<User>;

  constructor(private route: ActivatedRoute, private router: Router, private log: AuthenticationService,
              private _authService: AuthenticationService) {
    this.user = this._authService.user;
  }

  menu() {
    this.sidenav.toggle()
  }

  plant() {
    console.log('plant')
    this.router.navigate(['/map'])
  }

  myplant() {
    this.router.navigate(['/list'])
  }


  sec() {
    this.router.navigate(['/seclist'])
  }

  emp() {
    this.router.navigate(['/employees'])
  }

  harvest() {
    this.router.navigate(['/harvest'])
  }

  logout(){
    this.log.logout()
  }


  ngAfterViewInit(): void {
    // console.log(this.list)
    this.route.params.subscribe(params => {
      const sec = params['param']
      if (sec === 'sectors') {
        console.log('aaaaaaaaa1111a')
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
