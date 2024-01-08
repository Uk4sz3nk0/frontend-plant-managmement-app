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
