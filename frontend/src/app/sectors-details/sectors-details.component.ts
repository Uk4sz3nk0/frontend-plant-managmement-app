import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sectors-details',
  templateUrl: './sectors-details.component.html',
  styleUrl: './sectors-details.component.css'
})
export class SectorsDetailsComponent implements OnInit{
  @Input() tekst: string | undefined
  @Input() employee: string | undefined
  @Input() employee1: string | undefined
  @Input() liczbaPowtorzen: number[] | undefined

  number: number = 2
  texttest: string[] = []


  generateDetails(): number[]{
    return Array.from({length: this.number}, (_, index) => index)
    
  }

  delete(tekstPrzycisku: string){
  
    console.log(tekstPrzycisku.split('\n')[0])
    this.number -=1
  }

  add(){
      console.log('add')
  }

  ngOnInit(): void {
    console.log(this.tekst)
    if(this.tekst == 'lorem ipsum'){
      // this.employee1 = 'Dynamic employee'
      this.texttest =['aaaa', 'bbbb']
    }else{
      this.number = 3
      // this.employee1 = 'Dynamic employee1'
      this.texttest =['cccc', 'ddddd', 'eeeeee']
    }
    

    
  }

  
}
