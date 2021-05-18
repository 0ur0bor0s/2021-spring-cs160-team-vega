
describe('Search test: pass', () => {
    it('Gets, types and asserts', () => {
        cy.visit('http://localhost:3000')
        cy.get('input').type('Solid Shirt').should('have.value', 'Solid Shirt')
        cy.get('button').contains('Search').click()
        //cy.url().should('include', '/SearchPage')
        cy.get('div').contains('Solid Shirt')
    })
})


describe('Search test: pass', () => {
    it('Gets, types and asserts', () => {
        cy.visit('http://localhost:3000')
        cy.get('input').type('pants').should('have.value', 'pants')
        cy.get('button').contains('Search').click()
        //cy.url().should('include', '/SearchPage')
        cy.get('div').contains('pants')
    })
})



describe('Search test: product not in db', () => {
    it('Gets, types and asserts', () => {
        cy.visit('http://localhost:3000')
        cy.get('input').type('shirt').should('have.value', 'shirt')
        cy.get('button').contains('Search').click()
        //cy.url().should('include', '/SearchPage')
        cy.get('div').contains('shirt')
    })
})


/*
describe('Search test: empty input', () => {
    it('Gets, types and asserts', () => {
        cy.visit('http://localhost:3000')
        cy.get('input').should('have.value', '')
        cy.get('button').contains('Search').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Empty search input')
        })
        cy.on('window:confirm', () => true);
    })
})*/