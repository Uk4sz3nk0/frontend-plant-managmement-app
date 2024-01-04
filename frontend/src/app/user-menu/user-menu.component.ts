import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';

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
  


  constructor(private renderer: Renderer2, private route: ActivatedRoute, private router: Router){}
  menu(){
    this.sidenav.toggle()
  }

  plant(){
    // console.log('plant')
    // this.router.navigate(['/map'])
    // .then(() => {
    //   window.location.reload()
    // })

  }

  myplant(){
  //  this.router.navigate(['/list'])
  }

  det(){
  
  }

  sec(){
    // this.router.navigate(['/seclist'])
   }

   emp(){
    // this.router.navigate(['/employees'])
   }
  

  ngAfterViewInit(): void {
    console.log(this.list)
 //console.log(this.list.nativeElement)
  //  console.log("dasdfasdfas" +this.list.nativeElement.offsetWidth)
 //   console.log('aaaaaa')
  // this.renderer.setStyle(this.list.nativeElement, 'display', 'none')
  }
}
