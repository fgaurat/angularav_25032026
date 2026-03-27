import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Todo } from '../../../../services/product.service';

@Component({
  selector: 'app-todo-detail',
  imports: [RouterLink],
  template: `
    <h2>Détail Todo (resolver par id)</h2>
    @if (todo(); as t) {
      <dl>
        <dt>ID</dt><dd>{{ t.id }}</dd>
        <dt>Titre</dt><dd>{{ t.title }}</dd>
        <dt>Complété</dt><dd>{{ t.completed ? 'Oui' : 'Non' }}</dd>
        <dt>User ID</dt><dd>{{ t.userId }}</dd>
      </dl>
    }
    <a routerLink="..">← Retour à la liste</a>
  `,
})
export class TodoDetail {
  readonly todo = input.required<Todo>();
}
