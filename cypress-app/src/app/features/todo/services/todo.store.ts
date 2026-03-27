import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal, computed } from '@angular/core';
import { Todo } from '../entities/todo';

const API_URL = 'http://localhost:3001/todos';

@Injectable({ providedIn: 'root' })
export class TodoStore {
  private http = inject(HttpClient);
  private readonly todosSignal = signal<Todo[]>([]);

  readonly todos = this.todosSignal.asReadonly();
  readonly completedCount = computed(() => this.todosSignal().filter((t) => t.completed).length);
  readonly remainingCount = computed(() => this.todosSignal().filter((t) => !t.completed).length);
  readonly totalCount = computed(() => this.todosSignal().length);

  loadAll(): void {
    this.http.get<Todo[]>(API_URL).subscribe((todos) => {
      this.todosSignal.set(todos);
    });
  }

  add(title: string): void {
    const todo = { title: title.trim(), completed: false };
    this.http.post<Todo>(API_URL, todo).subscribe((created) => {
      this.todosSignal.update((todos) => [...todos, created]);
    });
  }

  toggle(id: number): void {
    const todo = this.todosSignal().find((t) => t.id === id);
    if (!todo) return;
    const updated = { completed: !todo.completed };
    this.http.patch<Todo>(`${API_URL}/${id}`, updated).subscribe((result) => {
      this.todosSignal.update((todos) => todos.map((t) => (t.id === id ? result : t)));
    });
  }

  delete(id: number): void {
    this.http.delete(`${API_URL}/${id}`).subscribe(() => {
      this.todosSignal.update((todos) => todos.filter((t) => t.id !== id));
    });
  }

  clearCompleted(): void {
    const completed = this.todosSignal().filter((t) => t.completed);
    completed.forEach((todo) => {
      this.http.delete(`${API_URL}/${todo.id}`).subscribe(() => {
        this.todosSignal.update((todos) => todos.filter((t) => t.id !== todo.id));
      });
    });
  }
}
