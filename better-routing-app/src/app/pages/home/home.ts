import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <h2>Home</h2>
    <p>Bienvenue sur la démo routing Angular !</p>
    <nav>
      <ul>
        <li><a routerLink="/about">About</a></li>
        <li><a routerLink="/products">Products (lazy loaded)</a></li>
        <li><a routerLink="/admin">Admin (protégé par guard)</a></li>
      </ul>
    </nav>
  `,
})
export class Home {}
