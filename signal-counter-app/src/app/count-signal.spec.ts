import { TestBed } from '@angular/core/testing';

import { CountSignal } from './count-signal';

describe('CountSignal', () => {
  let service: CountSignal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountSignal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
