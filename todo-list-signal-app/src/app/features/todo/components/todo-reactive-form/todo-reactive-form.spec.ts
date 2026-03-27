import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoReactiveForm } from './todo-reactive-form';

describe('TodoReactiveForm', () => {
  let component: TodoReactiveForm;
  let fixture: ComponentFixture<TodoReactiveForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoReactiveForm],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoReactiveForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
