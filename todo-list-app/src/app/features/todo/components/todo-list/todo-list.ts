import { AfterViewInit, ChangeDetectorRef, Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo-service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo, Todos } from '../../entities/todo';
import { EMPTY, filter, merge, Observable, switchMap } from 'rxjs';
import { MessageQueueService } from '../../../../core/services/message-queue-service';
import { Actions } from '../../../../core/enums/actions';
import { Action } from '../../../../core/models/action';

@Component({
  selector: 'app-todo-list',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList implements AfterViewInit {

  todoService = inject(TodoService)
  messageQueueService = inject(MessageQueueService)

  todos$: Observable<Todos> = EMPTY

  private changeDetectorRef = inject(ChangeDetectorRef)

  constructor() {
    const load$ = this.messageQueueService.bus$.pipe(
      filter((action: Action) => action.type === Actions.LOAD_TODOS)
    )


    const delete$ = this.messageQueueService.bus$.pipe(
      filter((action: Action) => action.type === Actions.DELETE_TODO),
      switchMap((action: Action) => this.todoService.delete(action.payload))
    )
    const add$ = this.messageQueueService.bus$.pipe(
      filter((action: Action) => action.type === Actions.NEW_TODO),
      switchMap((action: Action) => this.todoService.save(action.payload))
    )

    this.todos$ = merge(load$,delete$,add$).pipe(
      switchMap(() => this.todoService.findAll())
    )
  }


  ngAfterViewInit() {
    console.log("ngAfterViewInit");

    this.messageQueueService.dispatch({ type: Actions.LOAD_TODOS })
  }

  delete(todo: Todo) {

    this.messageQueueService.dispatch({ type: Actions.DELETE_TODO, payload: todo })


    // this.todoService.delete(todo).subscribe(()=>{
    //   this.todos$ = this.todoService.findAll()
    //   this.changeDetectorRef.markForCheck()

    // });
  }
}
