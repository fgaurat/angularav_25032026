// =============================================================
// 03 - Actions sur les todos (toggle, delete, clear)
// Concepts : .find(), .first(), .eq(), .within(), assertions avancées
// =============================================================

describe('03 - Actions sur les todos', () => {
  beforeEach(() => {
    cy.mockAllTodoApi();
    cy.visit('/');
    cy.wait('@getTodos');
    // Préparer des données de test
    cy.addTodo('Tâche 1');
    cy.wait('@postTodo');
    cy.addTodo('Tâche 2');
    cy.wait('@postTodo');
    cy.addTodo('Tâche 3');
    cy.wait('@postTodo');
  });

  it('devrait cocher un todo (toggle completed)', () => {
    // .first() prend le premier élément
    cy.get('[data-cy=todo-checkbox]').first().check();
    cy.wait('@patchTodo');

    // Le premier item doit avoir la classe .completed
    cy.get('[data-cy=todo-item]').first().should('have.class', 'completed');

    // Vérifier les stats
    cy.get('[data-cy=todo-stats]').should('contain.text', '2 restante(s)');
    cy.get('[data-cy=todo-stats]').should('contain.text', '1 terminée(s)');
  });

  it('devrait décocher un todo', () => {
    // Cocher puis décocher
    cy.get('[data-cy=todo-checkbox]').first().check();
    cy.wait('@patchTodo');
    cy.get('[data-cy=todo-checkbox]').first().uncheck();
    cy.wait('@patchTodo');

    cy.get('[data-cy=todo-item]').first().should('not.have.class', 'completed');
  });

  it('devrait supprimer un todo', () => {
    // .eq(1) sélectionne le 2ème élément (index 0-based)
    cy.get('[data-cy=todo-item]').eq(1).find('[data-cy=todo-delete]').click();
    cy.wait('@deleteTodo');

    cy.get('[data-cy=todo-item]').should('have.length', 2);
    cy.get('[data-cy=todo-title]').should('not.contain.text', 'Tâche 2');
  });

  it('devrait supprimer les todos terminés', () => {
    // Cocher les 2 premiers
    cy.get('[data-cy=todo-checkbox]').eq(0).check();
    cy.wait('@patchTodo');
    cy.get('[data-cy=todo-checkbox]').eq(1).check();
    cy.wait('@patchTodo');

    // Le bouton "Supprimer terminées" doit apparaître
    cy.get('[data-cy=clear-completed]').should('be.visible').click();

    // Il ne reste que la tâche 3
    cy.get('[data-cy=todo-item]').should('have.length', 1);
    cy.get('[data-cy=todo-title]').should('contain.text', 'Tâche 3');
  });

  it('devrait utiliser .within() pour cibler dans un élément', () => {
    // .within() restreint la portée des commandes
    cy.get('[data-cy=todo-item]').eq(2).within(() => {
      cy.get('[data-cy=todo-title]').should('contain.text', 'Tâche 3');
      cy.get('[data-cy=todo-checkbox]').should('not.be.checked');
      cy.get('[data-cy=todo-delete]').should('be.visible');
    });
  });
});
