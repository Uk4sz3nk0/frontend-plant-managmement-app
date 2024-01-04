import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css'
})
export class EmployeesListComponent {

  @Input() employee: string | undefined

  getEmployees(){
    
  }
}
