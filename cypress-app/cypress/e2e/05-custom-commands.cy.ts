// =============================================================
// 05 - Commandes personnalisées & bonnes pratiques
// Concepts : custom commands, data-cy, beforeEach, aliases
// =============================================================

describe('05 - Custom commands et bonnes pratiques', () => {
  beforeEach(() => {
    cy.mockAllTodoApi();
    cy.visit('/');
    cy.wait('@getTodos');
  });

  it('devrait utiliser la commande personnalisée addTodo', () => {
    // cy.addTodo() est défini dans cypress/support/commands.ts
    cy.addTodo('Créée avec custom command');
    cy.wait('@postTodo');

    cy.get('[data-cy=todo-item]').should('have.length', 1);
    cy.get('[data-cy=todo-title]').should('contain.text', 'Créée avec custom command');
  });

  it('devrait utiliser les aliases avec .as()', () => {
    cy.addTodo('Todo aliasée');
    cy.wait('@postTodo');

    // .as() crée un alias réutilisable
    cy.get('[data-cy=todo-item]').first().as('firstTodo');
    cy.get('[data-cy=todo-stats]').as('stats');

    // Utilisation avec @alias
    cy.get('@firstTodo').should('contain.text', 'Todo aliasée');
    cy.get('@stats').should('contain.text', '1 restante(s)');
  });

  it('devrait démontrer le chaînage fluide', () => {
    cy.addTodo('Chaînage fluide');
    cy.wait('@postTodo');

    // Exemple de chaînage
    cy.get('[data-cy=todo-item]')
      .should('have.length', 1)     // assertion
      .first()                       // filtrage
      .should('be.visible')          // assertion
      .find('[data-cy=todo-title]')  // recherche enfant
      .should('have.text', 'Chaînage fluide'); // assertion finale
  });

  it('devrait utiliser cy.log() pour le debug', () => {
    cy.addTodo('Debug todo');
    cy.wait('@postTodo');

    // cy.log() affiche dans le runner Cypress
    cy.log('**Vérification du todo ajouté**');
    cy.get('[data-cy=todo-item]').should('have.length', 1);

    cy.log('**Suppression du todo**');
    cy.get('[data-cy=todo-delete]').first().click();
    cy.wait('@deleteTodo');
    cy.get('[data-cy=todo-item]').should('have.length', 0);
  });
});
