import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Todo, TodoService } from '../services/product.service';

/**
 * Resolver fonctionnel : charge la liste des todos AVANT d'afficher la page.
 * Les données seront disponibles dans route.data['todos'].
 */
export const todosResolver: ResolveFn<Todo[]> = () => {
  return inject(TodoService).getAll();
};
