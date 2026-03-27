// ***********************************************
// Commandes personnalisées Cypress
// https://docs.cypress.io/api/cypress-api/custom-commands
// ***********************************************

const API_URL = 'http://localhost:3001/todos';

// -- Commande pour ajouter un todo via le formulaire --
Cypress.Commands.add('addTodo', (title: string) => {
  cy.get('[data-cy=todo-input]').type(title);
  cy.get('[data-cy=todo-submit]').click();
});

// -- Commande pour intercepter l'API et retourner une liste vide --
Cypress.Commands.add('mockEmptyTodos', () => {
  cy.intercept('GET', API_URL, []).as('getTodos');
});

// -- Commande pour intercepter l'API avec des données fixture --
Cypress.Commands.add('mockTodosFromFixture', (fixture: string = 'todos.json') => {
  cy.intercept('GET', API_URL, { fixture }).as('getTodos');
});

// -- Commande pour intercepter toutes les requêtes API (GET, POST, DELETE, PATCH) --
let mockIdCounter = 100;
Cypress.Commands.add('mockAllTodoApi', () => {
  const todos: any[] = [];
  mockIdCounter = 100;

  cy.intercept('GET', API_URL, (req) => {
    req.reply(todos);
  }).as('getTodos');

  cy.intercept('POST', API_URL, (req) => {
    const newTodo = { ...req.body, id: ++mockIdCounter };
    todos.push(newTodo);
    req.reply(newTodo);
  }).as('postTodo');

  cy.intercept('DELETE', `${API_URL}/*`, (req) => {
    const id = Number(req.url.split('/').pop());
    const index = todos.findIndex((t) => t.id === id);
    if (index > -1) todos.splice(index, 1);
    req.reply({});
  }).as('deleteTodo');

  cy.intercept('PATCH', `${API_URL}/*`, (req) => {
    const id = Number(req.url.split('/').pop());
    const todo = todos.find((t) => t.id === id);
    if (todo) Object.assign(todo, req.body);
    req.reply(todo);
  }).as('patchTodo');
});

// -- Déclarations TypeScript --
declare global {
  namespace Cypress {
    interface Chainable {
      addTodo(title: string): Chainable<void>;
      mockEmptyTodos(): Chainable<void>;
      mockTodosFromFixture(fixture?: string): Chainable<void>;
      mockAllTodoApi(): Chainable<void>;
    }
  }
}

export {};
