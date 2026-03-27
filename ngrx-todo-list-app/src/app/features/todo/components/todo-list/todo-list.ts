import { AfterViewInit, ChangeDetectorRef, Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo-service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo, Todos } from '../../entities/todo';
import { EMPTY, filter, merge, Observable, switchMap } from 'rxjs';
import { MessageQueueService } from '../../../../core/services/message-queue-service';
import { Actions } from '../../../../core/enums/actions';
import { Action } from '../../../../core/models/action';
import { Store } from '@ngrx/store';
import { deleteTodo, loadTodo } from '../../actions/todo.actions';
import { TodoState } from '../../entities/todo-state';

@Component({
  selector: 'app-todo-list',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {

  private store = inject(Store<TodoState>)
  todos$: Observable<Todos> = this.store.select('todoList')

  ngOnInit(): void {
    this.store.dispatch(loadTodo())
  }
  onDeleteTodo(todo:Todo){
    this.store.dispatch(deleteTodo({todo}))
  }
}
