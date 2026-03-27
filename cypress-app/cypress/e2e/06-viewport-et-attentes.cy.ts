// =============================================================
// 06 - Viewport, attentes et scénarios complets
// Concepts : cy.viewport(), cy.screenshot()
// =============================================================

describe('06 - Viewport et captures', () => {
  beforeEach(() => {
    cy.mockAllTodoApi();
    cy.visit('/');
    cy.wait('@getTodos');
  });

  it('devrait fonctionner en vue mobile', () => {
    // Changer le viewport pour simuler un mobile
    cy.viewport('iphone-x');

    cy.addTodo('Test mobile');
    cy.wait('@postTodo');
    cy.get('[data-cy=todo-item]').should('have.length', 1);

    // Prendre une capture d'écran
    cy.screenshot('mobile-view');
  });

  it('devrait fonctionner en vue tablette', () => {
    cy.viewport('ipad-2');

    cy.addTodo('Test tablette');
    cy.wait('@postTodo');
    cy.get('[data-cy=todo-item]').should('have.length', 1);
  });

  it('devrait fonctionner avec un viewport custom', () => {
    // Viewport en pixels
    cy.viewport(1920, 1080);

    cy.addTodo('Test Full HD');
    cy.wait('@postTodo');
    cy.get('[data-cy=todo-item]').should('be.visible');
  });
});

describe('06 - Scénario complet (workflow utilisateur)', () => {
  it('devrait simuler un parcours utilisateur complet', () => {
    cy.mockAllTodoApi();
    cy.visit('/');
    cy.wait('@getTodos');

    // 1. Vérifier l'état initial
    cy.get('[data-cy=empty-message]').should('be.visible');

    // 2. Ajouter des tâches
    cy.addTodo('Acheter du pain');
    cy.wait('@postTodo');
    cy.addTodo('Lire un livre');
    cy.wait('@postTodo');
    cy.addTodo('Faire du sport');
    cy.wait('@postTodo');

    // 3. Vérifier la liste
    cy.get('[data-cy=todo-item]').should('have.length', 3);
    cy.get('[data-cy=empty-message]').should('not.exist');

    // 4. Compléter une tâche
    cy.get('[data-cy=todo-checkbox]').eq(0).check();
    cy.wait('@patchTodo');
    cy.get('[data-cy=todo-stats]').should('contain.text', '1 terminée(s)');

    // 5. Supprimer une tâche
    cy.get('[data-cy=todo-item]').eq(2).find('[data-cy=todo-delete]').click();
    cy.wait('@deleteTodo');
    cy.get('[data-cy=todo-item]').should('have.length', 2);

    // 6. Supprimer les terminées
    cy.get('[data-cy=clear-completed]').click();
    cy.get('[data-cy=todo-item]').should('have.length', 1);
    cy.get('[data-cy=todo-title]').should('contain.text', 'Lire un livre');

    // 7. Capture d'écran finale
    cy.screenshot('workflow-final');
  });
});
