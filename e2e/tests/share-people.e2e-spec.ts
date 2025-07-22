import { faker } from '@faker-js/faker'

const sharePersonName = faker.person.fullName().slice(0, 20)
const sharePersonWhatsapp = '559921748' + faker.number.int(10).toString().padStart(2, '0')
const sharePersonBetterDayToSendInvoice = '1'

describe('Share people - E2E tests', () => {
	describe('/registrations/share-people', () => {
		beforeEach(() => {
			cy.login()
			cy.visit('/registrations/share-people')
		})

		it('should be able to create a share person', () => {
			cy.createSharePeople(sharePersonName, sharePersonWhatsapp, sharePersonBetterDayToSendInvoice)
		})
	})

	describe('/dividers/share-people', () => {
		beforeEach(() => {
			cy.login()
			cy.visit('/dividers/share-people')
		})

		it('should be able to see the share people', () => {
			cy.contains(sharePersonName)
		})

		it('should be able to edit a share person', () => {
			cy.contains(sharePersonName).within(($el) => {
				cy.wrap($el).parent().find('button[aria-label="Editar"]').click()
			})
			cy.selectOption('#betterDayToSendInvoice', '5')
			cy.get('button[type="submit"]').click()
			cy.contains('Pessoa editada com sucesso!')
		})

		it('should be able to disable a share person', () => {
			cy.contains(sharePersonName).within(($el) => {
				cy.wrap($el).parent().find('button[aria-label="Desabilitar"]').click()
			})
			cy.contains('Pessoa desabilitada com sucesso!')
		})
	})
})