// =============================================================
// 07 - Intercepter les appels API (cy.intercept)
// Concepts : cy.intercept(), cy.wait(), aliases réseau, fixtures,
//            mock de réponses, espionnage, simulation d'erreurs
// =============================================================

const API_URL = 'http://localhost:3001/todos';

describe('07 - cy.intercept() : mocker les réponses API', () => {
  it('devrait afficher les todos depuis une fixture JSON', () => {
    // Intercepter GET /todos et répondre avec le fichier fixtures/todos.json
    cy.intercept('GET', API_URL, { fixture: 'todos.json' }).as('getTodos');
    cy.visit('/');
    cy.wait('@getTodos');

    // La fixture contient 3 todos
    cy.get('[data-cy=todo-item]').should('have.length', 3);
    cy.get('[data-cy=todo-title]').first().should('contain.text', 'Apprendre Angular');
  });

  it('devrait afficher les todos depuis un tableau inline', () => {
    // On peut aussi passer les données directement
    cy.intercept('GET', API_URL, [
      { id: 1, title: 'Todo mockée A', completed: false },
      { id: 2, title: 'Todo mockée B', completed: true },
    ]).as('getTodos');

    cy.visit('/');
    cy.wait('@getTodos');

    cy.get('[data-cy=todo-item]').should('have.length', 2);
    cy.get('[data-cy=todo-item]').eq(1).should('have.class', 'completed');
  });

  it('devrait mocker la réponse POST pour l\'ajout', () => {
    cy.intercept('GET', API_URL, []).as('getTodos');
    cy.intercept('POST', API_URL, {
      statusCode: 201,
      body: { id: 42, title: 'Todo créée par le mock', completed: false },
    }).as('postTodo');

    cy.visit('/');
    cy.wait('@getTodos');

    cy.addTodo('Todo créée par le mock');
    cy.wait('@postTodo');

    // L'app affiche le todo retourné par le mock (id: 42)
    cy.get('[data-cy=todo-item]').should('have.length', 1);
    cy.get('[data-cy=todo-title]').should('contain.text', 'Todo créée par le mock');
  });
});

describe('07 - cy.intercept() : espionner les requêtes', () => {
  it('devrait vérifier le body envoyé au POST', () => {
    cy.mockAllTodoApi();
    cy.visit('/');
    cy.wait('@getTodos');

    cy.addTodo('Vérifier le body');
    cy.wait('@postTodo').its('request.body').should('deep.include', {
      title: 'Vérifier le body',
      completed: false,
    });
  });

  it('devrait vérifier que DELETE est appelé avec le bon id', () => {
    // Charger avec des données initiales
    cy.intercept('GET', API_URL, [
      { id: 99, title: 'A supprimer', completed: false },
    ]).as('getTodos');
    cy.intercept('DELETE', `${API_URL}/*`, {}).as('deleteTodo');

    cy.visit('/');
    cy.wait('@getTodos');

    cy.get('[data-cy=todo-delete]').click();
    cy.wait('@deleteTodo').its('request.url').should('include', '/99');
  });

  it('devrait vérifier que PATCH envoie le bon statut', () => {
    cy.intercept('GET', API_URL, [
      { id: 10, title: 'A cocher', completed: false },
    ]).as('getTodos');
    cy.intercept('PATCH', `${API_URL}/*`, {
      id: 10,
      title: 'A cocher',
      completed: true,
    }).as('patchTodo');

    cy.visit('/');
    cy.wait('@getTodos');

    cy.get('[data-cy=todo-checkbox]').check();
    cy.wait('@patchTodo').its('request.body').should('deep.equal', {
      completed: true,
    });
  });
});

describe('07 - cy.intercept() : simuler des erreurs', () => {
  it('devrait gérer une erreur 500 sur le chargement', () => {
    // L'erreur HTTP remonte comme exception non capturée dans l'app
    // On dit à Cypress de l'ignorer pour ce test
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('500')) return false;
    });

    // Simuler une erreur serveur
    cy.intercept('GET', API_URL, {
      statusCode: 500,
      body: { error: 'Internal Server Error' },
    }).as('getTodosError');

    cy.visit('/');
    cy.wait('@getTodosError');

    // L'app affiche 0 todos (le subscribe échoue)
    cy.get('[data-cy=empty-message]').should('be.visible');
  });

  it('devrait simuler une latence réseau', () => {
    // Ajouter un délai de 2 secondes
    cy.intercept('GET', API_URL, {
      delay: 2000,
      body: [{ id: 1, title: 'Todo lente', completed: false }],
    }).as('slowTodos');

    cy.visit('/');

    // Pendant le chargement, la liste est vide
    cy.get('[data-cy=empty-message]').should('be.visible');

    // Après le délai, le todo apparaît
    cy.wait('@slowTodos');
    cy.get('[data-cy=todo-item]').should('have.length', 1);
  });

  it('devrait simuler une erreur réseau (network failure)', () => {
    // Ignorer l'exception réseau remontée par HttpClient
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('Unknown Error')) return false;
    });

    cy.intercept('GET', API_URL, { forceNetworkError: true }).as('networkError');

    cy.visit('/');
    cy.wait('@networkError');

    // L'app reste dans l'état vide
    cy.get('[data-cy=empty-message]').should('be.visible');
  });
});

describe('07 - cy.intercept() : laisser passer les vraies requêtes (spy)', () => {
  it('devrait espionner sans bloquer la vraie API', () => {
    // Sans body/fixture, cy.intercept() espionne seulement (passthrough)
    cy.intercept('GET', API_URL).as('realGetTodos');

    cy.visit('/');
    cy.wait('@realGetTodos').then((interception) => {
      // On peut inspecter la vraie réponse de l'API
      expect(interception.response!.statusCode).to.equal(200);
      expect(interception.response!.body).to.be.an('array');
      expect(interception.response!.body.length).to.be.greaterThan(0);

      cy.log(`**L'API a retourné ${interception.response!.body.length} todos**`);
    });

    // La liste affiche les vrais todos de l'API
    cy.get('[data-cy=todo-item]').should('have.length.greaterThan', 0);
  });
});
