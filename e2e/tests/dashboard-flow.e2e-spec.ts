import { faker } from '@faker-js/faker'

const expenseName = faker.lorem.slug(2)
const cardName = faker.lorem.slug(1)
const expenseMonth = 6
const expenseMonthLabelOption = 'Julho'
const expenseYear = 2025

describe('Dashboard flow - E2E tests', () => {

	before(() => {
		cy.login()
		cy.createCard(cardName)
		cy.wait(4000)
		cy.createExpense({ expenseName, cardName, expenseMonth, expenseYear })
	})

	beforeEach(() => {
		cy.login()
		cy.visit('/')
	})

	it('should be able to see the dashboard', () => {
		cy.contains('DASHBOARD')
		cy.selectOption('#month', expenseMonthLabelOption)
		cy.selectOption('#year', expenseYear.toString())
		cy.findInLineTable(expenseName, 'R$ 100,00')
		cy.clickInLineTable(expenseName, 'button[aria-label="Ver detalhes da despesa"]')
		cy.contains('Mais detalhes da despesa')
	})

	it('should be able to delete a expense', () => {
		cy.contains('DASHBOARD')
		cy.selectOption('#month', expenseMonthLabelOption)
		cy.selectOption('#year', expenseYear.toString())
		cy.findInLineTable(expenseName, 'R$ 100,00')
		cy.clickInLineTable(expenseName, 'button[aria-label="Remover despesa"]')
		cy.get('button').contains('Excluir parcela').click()
		cy.contains('Despesa removida com sucesso!')
	})
})