import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { TodoService } from '../services/todo-service';
import { Todo, Todos } from '../entities/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoStore {

  todoService:TodoService = inject(TodoService)

  private data:WritableSignal<Todos> = signal<Todos>([])
  todos = this.data.asReadonly()

  loadTodos(){
    this.todoService.findAll().subscribe(todos => this.data.set(todos))
  }


  deleteTodo(todo: Todo) {
    this.todoService.delete(todo).subscribe(() => {
      this.data.update(todos => todos.filter(currentTodo => currentTodo.id !== todo.id))

    });
  }

  addTodo(todo: Todo) {
    this.todoService.save(todo).subscribe(savedTodo=> this.data.update(todos => [...todos,savedTodo]))
  }


}
