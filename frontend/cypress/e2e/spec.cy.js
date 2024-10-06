describe('the app', () => {
    it('logs in', () => {
        cy.visit('/').login()
    })

    it('searches', () => {
        cy.visit('/')
        cy.get('#search').type('test case')
        cy.get('.v-field__append-inner').click()
        cy.get(':nth-child(1) > .poster').click()
    })
    
    it('favorites', () => {
        cy.visit('/').login()
        cy.visit('/movie/tt6868278')
        cy.get('.mdi-star-outline').click()
        cy.get('.mdi-star')
    })

    it('unfavorites', () => {
        cy.visit('/').login()
        cy.get('.mdi-menu-right').click()
        cy.get(':nth-child(2) > .text-center > .v-btn > .v-btn__content > .mdi-star').click()
        cy.contains('The Test Case').should('not.exist')
    })
})