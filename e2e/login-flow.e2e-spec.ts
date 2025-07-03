const WEB_URL = Cypress.env('WEB_URL')

describe('Login flow - E2E tests', () => {
	it('should be able to access the login page', () => {
		cy.visit(`${WEB_URL}/login`)
		cy.get('h1').should('have.text', 'Faça seu login!')
	})

	it('should be able to authenticate with valid credentials', () => {
		cy.visit(`${WEB_URL}/login`)
		cy.get('input[name="email"]').type('contato@guilhermeselair.dev')
		cy.get('input[name="password"]').type('123456789')
		cy.get('button[type="submit"]').click()
		cy.get('h1').should('have.text', 'DASHBOARD')
	})
})