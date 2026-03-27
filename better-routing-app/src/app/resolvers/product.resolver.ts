import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Todo, TodoService } from '../services/product.service';

/**
 * Resolver fonctionnel : charge UN todo par son id (paramètre de route).
 */
export const todoResolver: ResolveFn<Todo> = (route: ActivatedRouteSnapshot) => {
  const id = Number(route.paramMap.get('id'));
  return inject(TodoService).getById(id);
};
