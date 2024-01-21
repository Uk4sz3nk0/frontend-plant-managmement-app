import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DetailsComponent } from '../details/details.component';
import { EndpointsService } from '../services/endpoints.service';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-plantation-list',
  templateUrl: './plantation-list.component.html',
  styleUrl: './plantation-list.component.css'
})
export class PlantationListComponent implements OnInit, AfterViewInit {
constructor(private renderer: Renderer2, private router: Router, private endpoint: EndpointsService, private auth: LoginService) {}

div = this.renderer.createElement('div');
dynamic !: ElementRef;

dane: any;

idnumber !: number

@ViewChild('list') list!: ElementRef
@ViewChild('details') det!: DetailsComponent


plantDetails(id: number){
this.router.navigate(['menu/details', id])
}


ngOnInit(): void {

}

pobierz() {
  this.endpoint.getPlantations().subscribe(
    (data) => {
      this.dane = data;
    },
    (error) => {
      console.error('Błąd podczas pobierania danych:', error);
    })}


ngAfterViewInit(): void {


  const width = (this.list.nativeElement.offsetWidth-5-this.list.nativeElement.offsetWidth*0.1)/1

  this.endpoint.getPlantations().subscribe(data => {

    for(let i = 0; i<data.length; i++){
      const newDiv = this.renderer.createElement('div');
      const name = this.renderer.createElement('h1');
      const city = this.renderer.createElement('h2');
      const address = this.renderer.createElement('h3');
      this.renderer.setProperty(name, 'innerHTML', data[i].name)
  
      this.renderer.setProperty(city, 'innerHTML', data[i].city)
      this.renderer.setProperty(address, 'innerHTML', data[i].street + " " + data[i].houseNumber)


      this.renderer.setStyle(newDiv, 'background','url("../../assets/images/background.jpg")');
      this.renderer.setStyle(newDiv, 'width', '85vw')
      this.renderer.setStyle(newDiv, 'background-size','98vw'+' 32vh'  )
      this.renderer.setStyle(newDiv, 'background-repeat', 'no-repeat'  )

      this.renderer.addClass(newDiv, 'plant')

      this.renderer.appendChild(newDiv, name);
      this.renderer.appendChild(newDiv, city);
      this.renderer.appendChild(newDiv, address);
     
      this.renderer.appendChild(this.list.nativeElement, newDiv);
 
      this.renderer.listen(newDiv, 'click', () => this.plantDetails(data[i].id))
     
      this.dynamic = newDiv
    }



  })

}

}
