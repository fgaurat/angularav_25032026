import { TestBed } from '@angular/core/testing';

import { AddHttpService } from './add-http-service';

describe('AddHttpService', () => {
  let service: AddHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
