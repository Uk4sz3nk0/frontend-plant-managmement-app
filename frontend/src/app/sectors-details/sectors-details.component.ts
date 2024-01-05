import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sectors-details',
  templateUrl: './sectors-details.component.html',
  styleUrl: './sectors-details.component.css'
})
export class SectorsDetailsComponent implements OnInit{

  constructor(private location: Location){}

  @Input() tekst: string | undefined
  @Input() employee: string | undefined
  @Input() employee1: string | undefined
  @Input() liczbaPowtorzen: number[] | undefined

  number: number = 2
  texttest: string[] = []
  ava_emp: string[] = ['Jan Kowalski', 'Stanisław Nowak', 'Anna Nowak']
  available: number = 3


  generateDetails(): number[]{
    return Array.from({length: this.number}, (_, index) => index)
    
  }

  delete(tekstPrzycisku: string){
  
    console.log(tekstPrzycisku.split('\n')[0])
    this.number -=1
  }

  add(): number[]{
    return Array.from({length: this.available}, (_, index) => index)
  }

  addToSector(event:any){
    const employeeToAdd = event.target.textContent
    console.log(event.target.textContent)
    this.texttest.push(employeeToAdd)
    this.generateDetails()

    
    this.number++
  }

  list(){

    console.log('dodano do listy')
    console.log(this.texttest)
    if(this.tekst == 'lorem ipsum'){
      // this.employee1 = 'Dynamic employee'
      this.texttest =['aaaa', 'bbbb']
    }else{
      this.number = 3
      // this.employee1 = 'Dynamic employee1'
      this.texttest =['cccc', 'ddddd', 'eeeeee']
    }

  }

  ngOnInit(): void {
this.list()

    

    
  }

  
}
