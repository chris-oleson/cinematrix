describe('template spec', () => {
    it('passes', () => {
        cy.visit('/')

        cy.get('[href="/login"]').click()
        cy.get('#username').type('test')
        cy.get('#password').type('password')
        cy.get('.rounded-0').click()

        cy.get('h1')
        cy.get('[href="/search"]').click()

        cy.get('#input-17').type('test case')
        cy.get('.v-field__append-inner').click()
        cy.get(':nth-child(1) > .poster').click()
        
        cy.get('.mdi-star-outline').click()
        cy.get('.mdi-star')

        cy.get('[href="/favorites?p=1"]').click()
        cy.get('.mdi-menu-right').click()
        cy.get(':nth-child(5) > .poster').click()

        cy.get('.mdi-star').click()
        cy.get('.mdi-star-outline')

        cy.get('.mr-4').click()
        cy.get('.text-h2')
    })
})