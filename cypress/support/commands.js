Cypress.Commands.add('login', () => {
    cy.visit('/')
    cy.get('[href="/login"]').click()
    cy.get('#username').type('test')
    cy.get('#password').type('password')
    cy.get('.rounded-0').click()
    cy.get('h1')
})