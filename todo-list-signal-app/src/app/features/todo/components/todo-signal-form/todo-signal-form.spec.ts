import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoSignalForm } from './todo-signal-form';

describe('TodoSignalForm', () => {
  let component: TodoSignalForm;
  let fixture: ComponentFixture<TodoSignalForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoSignalForm],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoSignalForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
