import { Component, inject, OnInit, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo, Todos } from '../../entities/todo';
import { TodoStore } from '../../store/todo-store';

@Component({
  selector: 'app-todo-list',
  imports: [ FormsModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList implements OnInit {

  todoStore = inject(TodoStore)
  todos:Signal<Todos> = this.todoStore.todos

  ngOnInit(){
    this.todoStore.loadTodos()
  }

  delete(todo: Todo) {
    this.todoStore.deleteTodo(todo)

  }
}
