import { Component, inject, signal } from '@angular/core';
import {form, FormField, required,Field} from '@angular/forms/signals';
import { TodoStore } from '../../store/todo-store';
import { Todo } from '../../entities/todo';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-todo-signal-form',
  imports: [FormField,JsonPipe],
  templateUrl: './todo-signal-form.html',
  styleUrl: './todo-signal-form.css',
})
export class TodoSignalForm {

  todoStore = inject(TodoStore)

  readonly todoModel = signal<Todo>({
    title:'',
    completed:false,
  })

  objTest = signal({
    prop1:"value 01",
    prop2:"value 02",
  })
  
  readonly todoForm = form(this.todoModel,(schemaPath)=>{
     required(schemaPath.title, {message: 'Title is required'})
  })

  submitTodo(event:Event){
    event.preventDefault()
    console.log(this.todoForm().value());
    this.todoStore.addTodo(this.todoForm().value())
    

  }

}
