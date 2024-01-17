import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  showElement: boolean = false;
  showPlants: boolean = true
  showDetails: boolean = false
  showSector: boolean = false

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @ViewChild('list') list!: ElementRef


  constructor(private route: ActivatedRoute) {
  }

  menu() {
    this.sidenav.toggle()
  }

  plant() {
    this.showElement = true
    this.showPlants = false
    this.showDetails = false
    this.showSector = false

  }

  myplant() {
    this.showElement = false
    this.showPlants = true
    this.showDetails = false
    this.showSector = false
  }

  det() {
    console.log("działa")
    this.showPlants = false
    this.showDetails = true
    this.showSector = false
  }


  ngAfterViewInit(): void {
    console.log(this.list)
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

  public userDetails(): void {

  }
}
