import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DetailsComponent } from '../details/details.component';
import { EndpointsService } from '../services/endpoints.service';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-plantation-list',
  templateUrl: './plantation-list.component.html',
  styleUrl: './plantation-list.component.css'
})
export class PlantationListComponent implements OnInit, AfterViewInit {
constructor(private renderer: Renderer2, private router: Router, private endpoint: EndpointsService, private auth: AuthenticationService) {}

div = this.renderer.createElement('div');
dynamic !: ElementRef;

dane: any;

idnumber !: number

@ViewChild('list') list!: ElementRef
@ViewChild('details') det!: DetailsComponent



plantDetails(id: number){

console.log(id)
console.log(this.det)
this.router.navigate(['menu/details', id])
  // this.renderer.setStyle(this.dynamic, 'display', 'none')

}

deletePlant(id: number){
  console.log(id)
  this.endpoint.deletePlant(id)

}

ngOnInit(): void {
  console.log('aaaaaaaaaa')

  // this.pobierz()
}

pobierz() {
  this.endpoint.getPlantations().subscribe(
    (data) => {
      this.dane = data;
      console.log(this.dane);
      // Tutaj możesz umieścić kod, który operuje na danych po odświeżeniu strony.
    },
    (error) => {
      console.error('Błąd podczas pobierania danych:', error);
    })}


ngAfterViewInit(): void {


 console.log(this.list.nativeElement.offsetWidth)

  //this.pobierz()
  const width = (this.list.nativeElement.offsetWidth-5-this.list.nativeElement.offsetWidth*0.1)/1

  this.endpoint.getPlantations().subscribe(data => {
    console.log(data)



    for(let i = 0; i<data.length; i++){
      const newDiv = this.renderer.createElement('div');
      const deletePlant = this.renderer.createElement('button')
      const name = this.renderer.createElement('h1');
      const city = this.renderer.createElement('p');
      const address = this.renderer.createElement('p');
      // const name = this.renderer.createText(data[i].name);
      this.renderer.setProperty(name, 'innerHTML', data[i].name)
      this.renderer.setProperty(deletePlant, 'innerHTML', 'Usuń plantację')
      this.renderer.setProperty(city, 'innerHTML', data[i].city)
      this.renderer.setProperty(address, 'innerHTML', data[i].street + " " + data[i].houseNumber)

      this.renderer.setStyle(deletePlant, 'border-radius','80px')

      this.renderer.setStyle(newDiv, 'background','url("../../assets/images/background.jpg")');
      this.renderer.setStyle(newDiv, 'width', '98vw')
      this.renderer.setStyle(newDiv, 'background-size','98vw'+' 32vh'  )
      this.renderer.setStyle(newDiv, 'background-repeat', 'no-repeat'  )


      this.renderer.addClass(newDiv, 'plant')

      // this.renderer.appendChild(newDiv, name);
      this.renderer.appendChild(newDiv, name);
      this.renderer.appendChild(newDiv, city);
      this.renderer.appendChild(newDiv, address);
      this.renderer.appendChild(newDiv, deletePlant);
      this.renderer.appendChild(this.list.nativeElement, newDiv);
      
      console.log(width+'px')
      console.log(width)
      this.renderer.listen(newDiv, 'click', () => this.plantDetails(data[i].id))
      this.renderer.listen(deletePlant, 'click', () => this.deletePlant(data[i].id))
      this.dynamic = newDiv
    }



  })


  // this.endpoint.getPlantations().then(data => {
  //   console.log(data)



  //   for(let i = 0; i<data.length; i++){
  //     const newDiv = this.renderer.createElement('div');
  //     const name = this.renderer.createElement('h1');
  //     const city = this.renderer.createElement('p');
  //     const address = this.renderer.createElement('p');
  //     // const name = this.renderer.createText(data[i].name);
  //     this.renderer.setProperty(name, 'innerHTML', data[i].name)
  //     this.renderer.setProperty(city, 'innerHTML', data[i].city)
  //     this.renderer.setProperty(address, 'innerHTML', data[i].street + " " + data[i].houseNumber)

  //     this.renderer.setStyle(newDiv, 'background','url("../../assets/images/background.jpg")');
  //     this.renderer.setStyle(newDiv, 'width', width+'px')
  //     this.renderer.setStyle(newDiv, 'background-size', width+'px'+' 50vh'  )


  //     this.renderer.addClass(newDiv, 'plant')

  //     // this.renderer.appendChild(newDiv, name);
  //     this.renderer.appendChild(newDiv, name);
  //     this.renderer.appendChild(newDiv, city);
  //     this.renderer.appendChild(newDiv, address);
  //     this.renderer.appendChild(this.list.nativeElement, newDiv);
  //     console.log(width+'px')
  //     console.log(width)
  //     this.renderer.listen(newDiv, 'click', () => this.plantDetails(data[i].id))
  //     this.dynamic = newDiv
  //   }



  // })





}

}
