import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { range } from 'rxjs';

@Component({
  selector: 'app-harvest',
  templateUrl: './harvest.component.html',
  styleUrl: './harvest.component.css'
})



export class HarvestComponent {
  range: FormGroup;
  constructor(private dateAdapter: DateAdapter<Date>, private fb: FormBuilder){
    dateAdapter.setLocale('en-GB')

    this.range = this.fb.group({
      start: null,
      end: null
    })
  }


  date(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement){
    console.log(dateRangeStart.value);
    console.log(dateRangeEnd.value);
  }
}

  ngOnInit(): void {
    this.endpoint.getPlantations().subscribe(
      (data) => {

        console.log(data)
        for(var i=0;i<data.length;i++){
          this.plants.push({ id: data[i].id, name: data[i].name });
        }
        // Tutaj możesz umieścić kod, który operuje na danych po odświeżeniu strony.
      },
      (error) => {
        console.error('Błąd podczas pobierania danych:', error);
      })}
  }

