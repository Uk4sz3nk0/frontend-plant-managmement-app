import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  showElement: boolean = false;
  showplants: boolean = true
  showdetails: boolean = false
  showSector: boolean = false

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @ViewChild('list') list!: ElementRef
  


  constructor(private renderer: Renderer2, private route: ActivatedRoute){}
  menu(){
    this.sidenav.toggle()
  }

  plant(){
    this.showElement = true
    this.showplants = false
    this.showdetails = false
    this.showSector = false

  }

  myplant(){
    this.showElement = false
    this.showplants = true
    this.showdetails = false
    this.showSector = false
  }

  det(){
    console.log("działa")
    this.showplants = false
    this.showdetails = true
    this.showSector = false
  }
  

  ngAfterViewInit(): void {
    console.log(this.list)
    this.route.params.subscribe(params => {
      const sec = params['param']
      if(sec === 'sectors'){
        console.log('aaaaaaaaa1111a')
        this.showElement = false
        this.showplants = false
        this.showdetails = false
        this.showSector = true

      }
    })
 //console.log(this.list.nativeElement)
  //  console.log("dasdfasdfas" +this.list.nativeElement.offsetWidth)
 //   console.log('aaaaaa')
  // this.renderer.setStyle(this.list.nativeElement, 'display', 'none')
  }
}
