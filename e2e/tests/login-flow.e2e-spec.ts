describe('Auth flow - E2E tests', () => {
	describe('/login', () => {

		it('should be able to authenticate with valid credentials', () => {
			cy.login()
		})

		it('should not be able to authenticate with invalid credentials', () => {
			cy.visit('/login')
			cy.get('input[name="email"]').type('invalid-email@mail.com')
			cy.get('input[name="password"]').type('invalid-password')
			cy.get('button[type="submit"]').click()
			cy.contains('Email e/ou senha incorretos...')
		})
	})
})