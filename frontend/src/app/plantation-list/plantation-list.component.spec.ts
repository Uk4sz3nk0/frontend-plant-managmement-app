import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantationListComponent } from './plantation-list.component';

describe('PlantationListComponent', () => {
  let component: PlantationListComponent;
  let fixture: ComponentFixture<PlantationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlantationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
