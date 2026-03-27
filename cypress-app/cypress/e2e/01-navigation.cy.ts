// =============================================================
// 01 - Navigation & premiers pas
// Concepts : cy.visit(), cy.get(), cy.contains(), assertions
// =============================================================

describe('01 - Navigation et vérifications de base', () => {
  beforeEach(() => {
    // On mock l'API pour que les tests soient déterministes
    cy.mockEmptyTodos();
    cy.visit('/');
    cy.wait('@getTodos');
  });

  it('devrait afficher le titre de la page', () => {
    // cy.get() sélectionne un élément du DOM
    cy.get('h1').should('contain.text', 'Todo App');
  });

  it('devrait afficher le dashboard', () => {
    // Sélection par attribut data-cy (bonne pratique !)
    cy.get('[data-cy=dashboard]').should('be.visible');
  });

  it('devrait afficher le message "aucune tâche" au départ', () => {
    // cy.contains() cherche un élément contenant le texte
    cy.contains('Aucune tâche pour le moment').should('be.visible');
  });

  it('devrait afficher le compteur à 0', () => {
    cy.get('[data-cy=todo-count]').should('contain.text', '(0)');
  });

  it('devrait avoir un champ de saisie et un bouton', () => {
    cy.get('[data-cy=todo-input]')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Ajouter une tâche...');

    cy.get('[data-cy=todo-submit]')
      .should('be.visible')
      .and('be.disabled'); // Désactivé quand le champ est vide
  });
});
