import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements AfterViewInit {

  showElement: boolean = false;
  showplants: boolean = false
  showdetails: boolean = true

  @ViewChild(MatSidenav) sidenav!: MatSidenav
  @ViewChild('list') list!: ElementRef
  // @ViewChild(MatSidenav) sidenav!: MatSidenav;
  // @ViewChild('list') list!: ElementRef
  


  constructor(private renderer: Renderer2){}
  menu(){
    this.sidenav.toggle()
  }

  plant(){
    this.showElement = true
    this.showplants = false
    this.showdetails = false

  }

  myplant(){
    this.showElement = false
    this.showplants = true
    this.showdetails = true
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
