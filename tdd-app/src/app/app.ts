import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Add } from "./add/add";

@Component({
  selector: 'app-root',
  imports: [ Add],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tdd-app');
}
