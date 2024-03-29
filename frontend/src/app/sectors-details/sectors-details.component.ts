import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Location} from '@angular/common';
import {EndpointsService} from '../services/endpoints.service';
import {PlantationService} from "../core/plantations";

@Component({
  selector: 'app-sectors-details',
  templateUrl: './sectors-details.component.html',
  styleUrl: './sectors-details.component.css'
})
export class SectorsDetailsComponent implements OnInit, OnChanges {

  constructor(private location: Location, private endpoint: EndpointsService, private _plantationService: PlantationService) {
  }

  @Input() tekst: string | undefined
  @Input() id!: number
  @Input() employee: string | undefined
  @Input() employee1: string | undefined
  @Input() liczbaPowtorzen: number[] | undefined

  @Input() plantationId: number;

  number: number = 2
  texttest: string[] = []
  ava_emp: string[] = ['Jan Kowalski', 'Stanisław Nowak', 'Anna Nowak']
  available: number = 3
  employeetoadd: string = ''
  email: number = 0


  empNumber(): number[] {
    return Array.from({length: this.number}, (_, index) => index)

  }

  delete(tekstPrzycisku: string) {

    this.number -= 1

    this.endpoint.getEmployeeByEmail(tekstPrzycisku).subscribe((email) => {

      this.texttest.push(email[0].email)
      this.empNumber()

      this._plantationService.deleteEmployee(this.plantationId, email[0].id).subscribe({
        next: () => {
          console.log('Uzytkownik usuniety')
        },
        error: er => console.error(er)
      })
      
    })
  }

  addToSector(event: any) {
    let employeeToAdd = this.employeetoadd
    this.endpoint.getEmployeeByEmail(employeeToAdd).subscribe((email) => {

      if(email[0] === undefined){
        alert("Nie znaleziono pracownika")
        this.employeetoadd = ''
        this.email = 0
       
      }else{
        if(!this.texttest.includes(email[0].email)){

        this.email = 1

      this.texttest.push(email[0].email)
     
      this.endpoint.addEmployeeToPlant(this.plantationId, email[0].id)
      this.employeetoadd = ''
      this.number++
    }else{
      alert("Ten pracownik jest już dodany do tej plantacji!")
      this.employeetoadd = ''
    }
    }
    })

    if(this.email == 1){
      this.number++
    }
    
  }

  ngOnInit(): void {
    

    this.endpoint.getEmployees(this.plantationId).subscribe((emp) => {
      this.texttest = []
      for(var i =0; i < emp.length; i++){
        this.texttest.push(emp[i].email)
      }
      this.number = emp.length
    })
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['plantationId'] && changes['plantationId'].currentValue) {
      this.endpoint.getEmployees(changes['plantationId'].currentValue).subscribe((emp) => {
        for(var i =0; i < emp.length; i++){
          this.texttest=[]
          this.texttest.push(emp[i].email)
        }
        this.number = emp.length
      })
    }

  }

}