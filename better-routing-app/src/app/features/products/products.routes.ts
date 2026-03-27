import { Routes } from '@angular/router';
import { todosResolver } from '../../resolvers/products.resolver';
import { todoResolver } from '../../resolvers/product.resolver';

/**
 * Routes enfant du feature "todos".
 * Chargées en lazy loading depuis app.routes.ts via loadChildren.
 */
export const todosRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/product-list/product-list').then((m) => m.TodoList),
    resolve: { todos: todosResolver },
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/product-detail/product-detail').then((m) => m.TodoDetail),
    resolve: { todo: todoResolver },
  },
];
