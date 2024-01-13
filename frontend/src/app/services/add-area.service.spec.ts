import { TestBed } from '@angular/core/testing';

import { AddAreaService } from './add-area.service';

describe('AddAreaService', () => {
  let service: AddAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
