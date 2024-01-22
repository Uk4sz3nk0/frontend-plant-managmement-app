import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {DetailsComponent} from '../details/details.component';
import {DateAdapter} from '@angular/material/core';
import {EndpointsService} from '../services/endpoints.service';
import {PlantationService} from "../core/plantations";

@Component({
  selector: 'app-sectors-list',
  templateUrl: './sectors-list.component.html',
  styleUrl: './sectors-list.component.css'
})
export class SectorsListComponent implements OnInit, AfterViewInit {
  constructor(private renderer: Renderer2, private router: Router, private dateAdapter: DateAdapter<Date>, private endpoint: EndpointsService,
              private _plantationService: PlantationService) {
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
  emp: string[][] = [['Jan Kowalski', 'Anna Nowak'], ['Jan Kowalski1', 'Anna Nowak1']]
  emp1: string[] = ['Jan Kowalski, Jan Nowak', 'Anna Nowak']
  tab: number = 0
  rows: number = 0
  id: number[] = []
  public plantations: any[];

  ngOnInit(): void {
    this._plantationService.getPlantations().subscribe({
      next: response => {
        this.plantations = response;
      },
      error: err => console.error(err)
    })
  }

ngAfterViewInit(): void {
  this.endpoint.getPlantations().subscribe(
    (data) => {

        this.number=data.length
        for(var i = 0; i < data.length; i++){
          this.texttest.push(data[i].name)
          this.id.push(data[i].id)
        }

    })

  }
}