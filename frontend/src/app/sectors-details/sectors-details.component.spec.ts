import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorsDetailsComponent } from './sectors-details.component';

describe('SectorsDetailsComponent', () => {
  let component: SectorsDetailsComponent;
  let fixture: ComponentFixture<SectorsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectorsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectorsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
