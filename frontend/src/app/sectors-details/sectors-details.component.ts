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


  generateDetails(): number[] {
    return Array.from({length: this.number}, (_, index) => index)

  }

  // numOfChips(): number[]{
  //   return 1
  // }

  delete(tekstPrzycisku: string) {

    console.log(tekstPrzycisku.split('\n')[0])
    this.number -= 1
  }

  add(): number[] {
    return Array.from({length: this.available}, (_, index) => index)
  }

  addtoplant(event: any) {
    console.log(this.employeetoadd)
    console.log(this.id)
  }

  addToSector(event: any) {
    const employeeToAdd = this.employeetoadd
    console.log(event.target.textContent)
    this.endpoint.getEmployeeByEmail(employeeToAdd).subscribe((email) => {
      // if (this.plantationId == null || email[0].id) {
      //   alert('Error in data')
      //   return;
      // }

      console.log(email[0])
      this.texttest.push(email[0].email)
      this.generateDetails()
      console.log(this.id)
      this._plantationService.addEmployee(this.plantationId, email[0].id).subscribe({
        next: () => alert('Employee added to plantation'),
        error: err => console.error(err)
      })
    })


    this.number++
  }

  list() {

    console.log('dodano do listy')
    console.log(this.texttest)
    console.log(this.tekst)
    this.endpoint.getEmployees
    if (this.tekst == 'aaaaaaaaaaa') {
      // this.employee1 = 'Dynamic employee'
      this.texttest = ['aaaa', 'bbbb']
    } else {
      this.number = 3
      // this.employee1 = 'Dynamic employee1'
      this.texttest = ['cccc', 'ddddd', 'eeeeee']
    }

  }

  ngOnInit(): void {


  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && changes['id'].currentValue) {
      console.log(changes['id'].currentValue);
      this.endpoint.getEmployees(changes['id'].currentValue).subscribe((emp) => {
        console.log(emp)
        this.number = emp.length
      })
    }

  }


}
