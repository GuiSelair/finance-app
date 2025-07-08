describe('Login flow - E2E tests', () => {
	it('should be able to access the login page', () => {
		cy.visit(`/login`)
		cy.get('h1').should('have.text', 'Faça seu login!')
	})

	it('should be able to authenticate with valid credentials', () => {
		cy.visit(`/login`)
		cy.get('input[name="email"]').type('test-e2e@mail.com')
		cy.get('input[name="password"]').type('123456789')
		cy.get('button[type="submit"]').click()
		cy.wait(3000)
		cy.get('h1').should('have.text', 'DASHBOARD')
	})
})