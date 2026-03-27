import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  template: `
    <h2>Admin</h2>
    <p>Vous êtes authentifié ! Cette page est protégée par un <code>canActivate</code> guard.</p>
  `,
})
export class Admin {}
