describe('template spec', () => {

  beforeEach(()=>{
    cy.visit('http://localhost:4200')
  })
  
  // it('passes', () => {
  //   cy.visit('http://localhost:4200')
  // })

  it('page title', () => {
    cy.get("h1").should('contain.text','Hello, todo-list-app')
  })

  it('add todo', () => {
    cy.get("[data-cy=todo-input]").type('Cypress !')
    cy.get("[data-cy=todo-submit]").click()
  })



})