import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inc } from './inc';

describe('Inc', () => {
  let component: Inc;
  let fixture: ComponentFixture<Inc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inc],
    }).compileComponents();

    fixture = TestBed.createComponent(Inc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
