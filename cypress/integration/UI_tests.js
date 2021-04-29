
describe('Search test: pass', () => {
    it('Gets, types and asserts', () => {
        cy.visit('http://localhost:3000')
        cy.get('input').type('Striped shirt').should('have.value', 'Striped shirt')
        cy.get('button').contains('Search').click()
        cy.url().should('include', '/SearchPage/submit')
        cy.get('.productName').should('have.value', 'Striped shirt')
    })
})

describe('Search test: product not in db', () => {
    it('Gets, types and asserts', () => {
        cy.visit('http://localhost:3000')
        cy.get('input').type('Solid shirt').should('have.value', 'Solid shirt')
        cy.get('button').contains('Search').click()
        cy.url().should('include', '/SearchPage/submit')
        cy.get('.productName').should('not.have.value', 'Solid shirt')
    })
})

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
})
