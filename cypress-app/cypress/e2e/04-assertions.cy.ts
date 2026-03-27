// =============================================================
// 04 - Assertions avancées
// Concepts : should(), and(), each(), its(), invoke()
// =============================================================

describe('04 - Assertions avancées', () => {
  beforeEach(() => {
    cy.mockAllTodoApi();
    cy.visit('/');
    cy.wait('@getTodos');
    cy.addTodo('Angular');
    cy.wait('@postTodo');
    cy.addTodo('Cypress');
    cy.wait('@postTodo');
    cy.addTodo('TypeScript');
    cy.wait('@postTodo');
  });

  it('devrait vérifier le nombre exact d\'éléments', () => {
    cy.get('[data-cy=todo-item]')
      .should('have.length', 3)
      .and('be.visible');
  });

  it('devrait vérifier le texte de chaque todo avec .each()', () => {
    const expected = ['Angular', 'Cypress', 'TypeScript'];

    // .each() itère sur chaque élément jQuery
    cy.get('[data-cy=todo-title]').each(($el, index) => {
      cy.wrap($el).should('have.text', expected[index]);
    });
  });

  it('devrait vérifier les propriétés CSS', () => {
    // Cocher le premier todo
    cy.get('[data-cy=todo-checkbox]').first().check();
    cy.wait('@patchTodo');

    // Vérifier que le style text-decoration est appliqué
    cy.get('[data-cy=todo-item]')
      .first()
      .find('[data-cy=todo-title]')
      .should('have.css', 'text-decoration-line', 'line-through');
  });

  it('devrait utiliser .its() pour accéder à une propriété', () => {
    // .its('length') accède à la propriété length du résultat
    cy.get('[data-cy=todo-item]').its('length').should('eq', 3);
  });

  it('devrait utiliser .invoke() pour appeler une méthode jQuery', () => {
    // .invoke('text') appelle .text() sur l'élément jQuery
    cy.get('[data-cy=todo-title]')
      .first()
      .invoke('text')
      .should('equal', 'Angular');
  });

  it('devrait utiliser .then() pour des assertions personnalisées', () => {
    cy.get('[data-cy=todo-item]').then(($items) => {
      // $items est un objet jQuery, on peut faire des assertions manuelles
      expect($items).to.have.length(3);
      expect($items.first()).to.contain.text('Angular');
      expect($items.last()).to.contain.text('TypeScript');
    });
  });
});
