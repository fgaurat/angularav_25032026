import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <h2>404 — Page introuvable</h2>
    <p>La route demandée n'existe pas.</p>
    <a routerLink="/">Retour à l'accueil</a>
  `,
})
export class NotFound {}
