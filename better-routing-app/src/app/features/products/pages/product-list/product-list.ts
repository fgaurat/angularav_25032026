import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Todo } from '../../../../services/product.service';

@Component({
  selector: 'app-todo-list',
  imports: [RouterLink],
  template: `
    <h2>Todos (lazy loaded + resolver)</h2>
    <p>Les données sont chargées depuis <code>http://localhost:3001/todos</code> par le resolver avant l'affichage.</p>
    <ul>
      @for (todo of todos(); track todo.id) {
        <li>
          <a [routerLink]="[todo.id]">
            {{ todo.completed ? '✅' : '⬜' }} {{ todo.title }}
          </a>
        </li>
      }
    </ul>
  `,
})
export class TodoList {
  readonly todos = input.required<Todo[]>();
}
