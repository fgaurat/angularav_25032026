import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoStore } from '../../services/todo.store';

@Component({
  selector: 'app-todo-form',
  imports: [FormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  private store = inject(TodoStore);
  newTitle = '';

  addTodo(): void {
    const title = this.newTitle.trim();
    if (!title) return;
    this.store.add(title);
    this.newTitle = '';
  }
}
