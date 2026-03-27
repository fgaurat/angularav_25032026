import { Component, inject } from '@angular/core';
import { TodoStore } from '../../services/todo.store';

@Component({
  selector: 'app-todo-list',
  imports: [],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  store = inject(TodoStore);
}
