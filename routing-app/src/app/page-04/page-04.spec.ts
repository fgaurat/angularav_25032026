import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page04 } from './page-04';

describe('Page04', () => {
  let component: Page04;
  let fixture: ComponentFixture<Page04>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Page04],
    }).compileComponents();

    fixture = TestBed.createComponent(Page04);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
