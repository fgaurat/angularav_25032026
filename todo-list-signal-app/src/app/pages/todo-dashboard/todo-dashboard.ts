import { Component } from '@angular/core';
import { TodoList } from "../../features/todo/components/todo-list/todo-list";
import { TodoForm } from '../../features/todo/components/todo-form/todo-form';
import { TodoSignalForm } from "../../features/todo/components/todo-signal-form/todo-signal-form";

@Component({
  selector: 'app-todo-dashboard',
  imports: [TodoList, TodoForm, TodoSignalForm],
  templateUrl: './todo-dashboard.html',
  styleUrl: './todo-dashboard.css',
})
export class TodoDashboard {

  
}
