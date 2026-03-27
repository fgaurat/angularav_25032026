
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { Todos } from '../entities/todo';
import { environment } from '../../../../environments/environment';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Vérifie qu'aucune requête non attendue n'a été faite
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call findAll() and return a list of todos', () => {
    const mockTodos: Todos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true },
    ];

    let result: Todos | undefined;

    service.findAll().subscribe((todos) => {
      result = todos;
    });

    // Intercepte la requête HTTP
    const req = httpMock.expectOne(environment.url_todos);

    expect(req.request.method).toBe('GET');

    // Simule la réponse du serveur
    req.flush(mockTodos);

    expect(result).toEqual(mockTodos);
  });

  it('should hit the correct URL', () => {
    service.findAll().subscribe();

    const req = httpMock.expectOne(environment.url_todos);
    expect(req.request.url).toBe(environment.url_todos);

    req.flush([]);
  });

  it('should handle an empty list', () => {
    let result: Todos | undefined;

    service.findAll().subscribe((todos) => {
      result = todos;
    });

    const req = httpMock.expectOne(environment.url_todos);
    req.flush([]);

    expect(result).toEqual([]);
  });

  it('should handle a server error', () => {
    let errorReceived = false;

    service.findAll().subscribe({
      next: () => {},
      error: () => { errorReceived = true; },
    });

    const req = httpMock.expectOne(environment.url_todos);
    req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });

    expect(errorReceived).toBe(true);
  });
});