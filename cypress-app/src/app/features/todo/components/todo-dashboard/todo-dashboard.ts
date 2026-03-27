import { Component, inject, OnInit } from '@angular/core';
import { TodoForm } from '../todo-form/todo-form';
import { TodoList } from '../todo-list/todo-list';
import { TodoStore } from '../../services/todo.store';

@Component({
  selector: 'app-todo-dashboard',
  imports: [TodoForm, TodoList],
  templateUrl: './todo-dashboard.html',
  styleUrl: './todo-dashboard.css',
})
export class TodoDashboard implements OnInit {
  store = inject(TodoStore);

  ngOnInit(): void {
    this.store.loadAll();
  }
}
