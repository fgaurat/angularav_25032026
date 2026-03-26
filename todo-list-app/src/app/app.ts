import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TodoDashboard } from "./pages/todo-dashboard/todo-dashboard";

@Component({
  selector: 'app-root',
  imports: [FormsModule, TodoDashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo-list-app');
  protected  oldTitle = 'old todo-list-app';


  onChange(event:any){
    this.oldTitle = event.target.value;

  }
}
