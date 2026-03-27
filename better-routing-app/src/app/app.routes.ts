import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Admin } from './pages/admin/admin';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  // Route par défaut → redirige vers /home
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Routes eagerly loaded (chargées immédiatement)
  { path: 'home', component: Home },
  { path: 'about', component: About },

  // Route protégée par un guard (canActivate)
  { path: 'admin', component: Admin, canActivate: [authGuard] },

  // Route lazy loaded : le bundle "todos" n'est téléchargé qu'à la navigation
  {
    path: 'todos',
    loadChildren: () => import('./features/products/products.routes').then((m) => m.todosRoutes),
  },

  // Wildcard : toute route inconnue → 404
  { path: '**', component: NotFound },
];
