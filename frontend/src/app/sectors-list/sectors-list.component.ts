import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DetailsComponent } from '../details/details.component';
import { DateAdapter } from '@angular/material/core';
import { EndpointsService } from '../services/endpoints.service';

@Component({
  selector: 'app-sectors-list',
  templateUrl: './sectors-list.component.html',
  styleUrl: './sectors-list.component.css'
})
export class SectorsListComponent implements AfterViewInit {
  constructor(private renderer: Renderer2, private router: Router, private dateAdapter: DateAdapter<Date>, private endpoint: EndpointsService){
    dateAdapter.setLocale('en-GB')
  }
  


  div = this.renderer.createElement('div');
dynamic !: ElementRef;

@ViewChild('list') list!: ElementRef
@ViewChild('details') det!: DetailsComponent

  selectedValue!: string;

number: number = 1
liczbaPowtorzen: number = 1
cols: number = 0
texttest: string[] = []
plants: string[] = []
emp: string[][] = [['Jan Kowalski', 'Anna Nowak'],['Jan Kowalski1', 'Anna Nowak1']]
emp1: string[] = ['Jan Kowalski, Jan Nowak', 'Anna Nowak']
tab: number = 0
rows:number = 0
id: number[] = []


generateDetails(): number[]{
  return Array.from({length: this.number}, (_, index) => index)
  
  
}

generateEmployees(): number[]{
  // this.tab
  
  return Array.from({length: this.liczbaPowtorzen}, (_, index) => {
  const value = index
  if(value + 1 == this.emp[this.cols].length && this.cols+1 < this.emp.length && index > 0){
    this.cols++
    console.log('aaaaaaaa')
  }
  
  this.liczbaPowtorzen = this.emp[this.cols].length
  console.log(this.cols, index)
  this.rows = value
  return value}
  )
 
}

change(event: any){
  console.log(event.value)

const data = new Date(event.value);

const dzien = String(data.getDate()).padStart(2, '0');
const miesiac = String(data.getMonth() + 1).padStart(2, '0');
const rok = data.getFullYear();

const sformatowanaData = `${dzien}/${miesiac}/${rok}`;

console.log(sformatowanaData);  // Wyświetli: 10/01/2024

}

wybranaOpcja(event: any){
  console.log(event.value)
  this.endpoint.getAreasByPlantation(6).subscribe((value) =>{
    console.log(value)
  })
}

// generateEmployees1(): number[][] {
//   const rows = this.liczbaPowtorzen;
//   const cols = 2;

//   return Array.from({ length: rows }, (_, rowIndex) => {
//     return Array.from({ length: cols }, (_, colIndex) => {
//       // Tutaj możesz wstawić dowolną logikę inicjalizacji elementów tablicy dwuwymiarowej
//       return rowIndex * cols + colIndex;
      
//     });
//   });
// }

ngAfterViewInit(): void {
  this.endpoint.getPlantations().subscribe(
    (data) => {

        console.log(data)
        this.number=data.length
        for(var i = 0; i < data.length; i++){
          this.texttest.push(data[i].name)
          this.id.push(data[i].id)
        }
        console.log(this.id)
        console.log(this.plants)
      // Tutaj możesz umieścić kod, który operuje na danych po odświeżeniu strony.
    })






  // const width = (this.list.nativeElement.offsetWidth-5-this.list.nativeElement.offsetWidth*0.1)/1

  // for(let i = 0; i<2; i++){
  //   const newDiv = this.renderer.createElement('div');
  //   const newP = this.renderer.createElement('p');
  //   const newP1= this.renderer.createElement('p');
  //   const newP2 = this.renderer.createElement('p');
  //   const button = this.renderer.createElement('button');
  //   const add = this.renderer.createElement('mat-icon');
 
  //   const text = this.renderer.createText('sektor nr '+ (i+1));
  //   const text1 = this.renderer.createText('Pracownik:  '+ (i+1));
  //   const text2 = this.renderer.createText('Ilość zebranych owoców:  '+ (i+1));
  //   const text3 = this.renderer.createText('Lorem ipsum  '+ (i+1));
  //   const icon = this.renderer.createText('add');

  //  this.renderer.appendChild(button, text1)
  //  this.renderer.appendChild(newP1, text2)
  //  this.renderer.appendChild(newP2, text3)
  //  this.renderer.appendChild(add, icon) 
   
  //   this.renderer.setStyle(newDiv, 'background-color', 'lightblue');
  //   this.renderer.setStyle(newDiv, 'width', width+'px')
    
    
  //   this.renderer.addClass(newDiv, 'plant')
  //   // <mat-icon>add</mat-icon>
  //   this.renderer.appendChild(newDiv, text);
  //   // this.renderer.appendChild(newDiv, this.renderer.createElement('p'));
  //   this.renderer.appendChild(newDiv, newP);
  //   this.renderer.appendChild(newDiv, newP1);
  //   this.renderer.appendChild(newDiv, newP2);
  //   this.renderer.appendChild(newDiv, button);
  //   this.renderer.appendChild(newDiv, icon);
  //   this.renderer.appendChild(this.list.nativeElement, newDiv);

  // }
}
}
