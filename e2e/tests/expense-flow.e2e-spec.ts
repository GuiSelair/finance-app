import { faker } from '@faker-js/faker'

const expenseName = faker.lorem.slug(2)
const expenseNameSplit = faker.lorem.slug(2)
const cardName = faker.lorem.slug(1)
const sharePersonName = faker.person.fullName().slice(0, 20)
const sharePersonWhatsapp = '559921748' + faker.number.int(10).toString().padStart(2, '0')
const sharePersonBetterDayToSendInvoice = '1'
const expenseMonth = 6
const expenseMonthLabelOption = 'Julho'
const expenseYear = 2025

describe('Expense flow - E2E tests', () => {
	describe('/registrations/expenses', () => {
		before(() => {
			cy.login()
			cy.createCard(cardName)
		})

		beforeEach(() => {
			cy.login()
		})

		it('should be able to create a simple expense', () => {
			cy.createExpense({ expenseName, cardName, expenseMonth, expenseYear })
		})

		it('should be able to create a expense with split', () => {
			cy.createSharePeople(sharePersonName, sharePersonWhatsapp, sharePersonBetterDayToSendInvoice)
			cy.wait(4000)
			cy.visit(`/registrations/expenses`)
			cy.get('input[name="name"]').type(expenseNameSplit)
			cy.get('input[name="purchaseDate"]').type('2025-06-13')
			cy.get('input[name="manualExpenseDate"]').type(`${expenseYear}-${(expenseMonth + 1).toString().padStart(2, '0')}`)
			cy.selectOption('#paymentMethod', cardName)
			cy.get('input[name="totalValue"]').type('100')
			cy.get('#isSplit').click({ force: true })
			cy.selectOption('#sharePerson', sharePersonName)
			cy.get('input[name="amount"]').type('90')
			cy.get('button[aria-label="Adicionar pessoa a ser cobrada"]').click()
			cy.get('button[type="submit"]').click()
			cy.contains('Despesa criada com sucesso!')

			cy.visit('/')
			cy.selectOption('#month', expenseMonthLabelOption)
			cy.selectOption('#year', expenseYear.toString())

			cy.visit('/dividers/total-per-person')
			cy.findInLineTable(sharePersonName, 'R$ 90,00')
		})
	})
})