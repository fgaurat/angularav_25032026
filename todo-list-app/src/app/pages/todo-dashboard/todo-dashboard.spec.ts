import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDashboard } from './todo-dashboard';

describe('TodoDashboard', () => {
  let component: TodoDashboard;
  let fixture: ComponentFixture<TodoDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
