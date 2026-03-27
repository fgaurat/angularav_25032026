import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

export const todosResolver: ResolveFn<any> = (route, state) => {
  const http =inject(HttpClient)
  
  return http.get<any>('http://localhost:3001/todos');
};
