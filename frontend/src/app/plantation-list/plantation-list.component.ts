import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-plantation-list',
  templateUrl: './plantation-list.component.html',
  styleUrl: './plantation-list.component.css'
})
export class PlantationListComponent implements AfterViewInit {
constructor(private renderer: Renderer2, private router: Router) {}

div = this.renderer.createElement('div');
dynamic !: ElementRef;

@ViewChild('list') list!: ElementRef
@ViewChild('details') det!: DetailsComponent



plantDetails(){
  
console.log('fsdafsdfds')
console.log(this.det)
  // this.renderer.setStyle(this.dynamic, 'display', 'none')

}


ngAfterViewInit(): void {

 
  console.log(this.list.nativeElement.offsetWidth)
  const width = (this.list.nativeElement.offsetWidth-5-this.list.nativeElement.offsetWidth*0.1)/1

  for(let i = 0; i<1; i++){
    const newDiv = this.renderer.createElement('div');
    const text = this.renderer.createText('plantacja');
    this.renderer.setStyle(newDiv, 'background-color', 'lightblue');
    this.renderer.setStyle(newDiv, 'width', width+'px')
    
    
    this.renderer.addClass(newDiv, 'plant')
    
    this.renderer.appendChild(newDiv, text);
    this.renderer.appendChild(this.list.nativeElement, newDiv);
    console.log(width+'px')
    console.log(width)
    this.renderer.listen(newDiv, 'click', () => this.plantDetails())
    this.dynamic = newDiv
  }
  
  
}

}
