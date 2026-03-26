import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoDashboard } from "./pages/todo-dashboard/todo-dashboard";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodoDashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ngrx-todo-list-app');
}
