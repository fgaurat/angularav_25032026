import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoDashboard } from './features/todo/components/todo-dashboard/todo-dashboard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodoDashboard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
