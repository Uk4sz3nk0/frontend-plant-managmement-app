import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  showElement: boolean = false;
  showplants: boolean = true
  showdetails: boolean = false

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @ViewChild('list') list!: ElementRef
  


  constructor(private renderer: Renderer2){}
  menu(){
    this.sidenav.toggle()
  }

  plant(){
    this.showElement = true
    this.showplants = false

  }

  myplant(){
    this.showElement = false
    this.showplants = true
    this.showdetails = false
  }

  det(){
    console.log("działa")
    this.showplants = false
    this.showdetails = true
  }
  

  ngAfterViewInit(): void {
    console.log(this.list)
 //console.log(this.list.nativeElement)
  //  console.log("dasdfasdfas" +this.list.nativeElement.offsetWidth)
 //   console.log('aaaaaa')
  // this.renderer.setStyle(this.list.nativeElement, 'display', 'none')
  }
}
