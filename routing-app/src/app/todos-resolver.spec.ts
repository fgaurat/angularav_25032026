import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { todosResolver } from './todos-resolver';

describe('todosResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => todosResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
