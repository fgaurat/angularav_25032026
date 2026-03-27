// =============================================================
// 02 - Interactions utilisateur
// Concepts : cy.type(), cy.click(), cy.clear(), chaînage
// =============================================================

describe('02 - Interactions avec le formulaire', () => {
  beforeEach(() => {
    // Mock complet de l'API (GET, POST, DELETE, PATCH)
    cy.mockAllTodoApi();
    cy.visit('/');
    cy.wait('@getTodos');
  });

  it('devrait activer le bouton quand on tape du texte', () => {
    cy.get('[data-cy=todo-input]').type('Ma première tâche');
    cy.get('[data-cy=todo-submit]').should('not.be.disabled');
  });

  it('devrait ajouter un todo via le formulaire', () => {
    // Saisie + soumission
    cy.get('[data-cy=todo-input]').type('Apprendre Cypress');
    cy.get('[data-cy=todo-submit]').click();
    cy.wait('@postTodo');

    // Vérifications
    cy.get('[data-cy=todo-item]').should('have.length', 1);
    cy.get('[data-cy=todo-title]').should('contain.text', 'Apprendre Cypress');
    cy.get('[data-cy=todo-count]').should('contain.text', '(1)');
  });

  it('devrait vider le champ après ajout', () => {
    cy.get('[data-cy=todo-input]').type('Une tâche');
    cy.get('[data-cy=todo-submit]').click();
    cy.wait('@postTodo');

    // Le champ doit être vidé
    cy.get('[data-cy=todo-input]').should('have.value', '');
  });

  it('devrait ajouter plusieurs todos', () => {
    const todos = ['Faire les courses', 'Réviser Angular', 'Préparer la démo'];

    todos.forEach((todo) => {
      cy.get('[data-cy=todo-input]').type(todo);
      cy.get('[data-cy=todo-submit]').click();
      cy.wait('@postTodo');
    });

    cy.get('[data-cy=todo-item]').should('have.length', 3);
    cy.get('[data-cy=todo-count]').should('contain.text', '(3)');
  });

  it('devrait soumettre avec la touche Entrée', () => {
    // {enter} simule la touche Entrée
    cy.get('[data-cy=todo-input]').type('Soumis avec Entrée{enter}');
    cy.wait('@postTodo');
    cy.get('[data-cy=todo-item]').should('have.length', 1);
  });
});
