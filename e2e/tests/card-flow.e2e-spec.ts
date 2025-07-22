import { faker } from '@faker-js/faker'

const cardName = faker.lorem.slug(1)

describe('Card flow - E2E tests', () => {
	describe('/registrations/cards', () => {
		beforeEach(() => {
			cy.login()
		})

		it('should be able to create a card', () => {
			cy.createCard(cardName)
		})

		it('should not be able to create a card with the same name', () => {
			cy.visit('/registrations/cards')
			cy.get('input[name="name"]').type(cardName)
			cy.selectOption('#flag', 'Visa')
			cy.get('input[name="turningDay"]').type('10')
			cy.get('input[name="dueDay"]').type('20')
			cy.get('button[type="submit"]').click()
			cy.contains('Já existe um cartão com esse apelido! Escolha outro e tente novamente.')
		})
	})

	describe('/cards/totalizers', () => {
		beforeEach(() => {
			cy.login()
			cy.visit(`/cards/totalizers`)
		})

		it('should be able to get the empty card totalizers', () => {
			cy.contains('Resumo por cartões')
			cy.contains(cardName)
			cy.contains('R$ 0,00')
		})
	})
})