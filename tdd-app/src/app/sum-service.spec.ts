import { TestBed } from '@angular/core/testing';

import { SumService } from './sum-service';

describe('SumService', () => {
  let service: SumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 3 when 2+1', () => {
    expect(service.add(2,1)).toBe(3);
  });


});
