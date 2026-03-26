import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../entities/todo';
import { JsonPipe } from '@angular/common';
import { TodoService } from '../../services/todo-service';
import { MessageQueueService } from '../../../../core/services/message-queue-service';
import { Actions } from '../../../../core/enums/actions';

@Component({
  selector: 'app-todo-form',
  imports: [FormsModule, JsonPipe],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {


  private messageQueueService: MessageQueueService = inject(MessageQueueService)

  todoFormModel: Todo = {
    title: "faire de l'Angular",
    completed: true
  }

  todoService = inject(TodoService)

  submitTodo() {
    //this.todoService.save(this.todoFormModel).subscribe()
    this.messageQueueService.dispatch({ type: Actions.NEW_TODO, payload: this.todoFormModel })
  }

}
