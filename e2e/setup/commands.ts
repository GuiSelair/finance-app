/// <reference types="cypress" />

Cypress.Commands.add('login', (override?: { email?: string, password?: string }) => {
	cy.session(override?.email || 'test-e2e@mail.com', () => {
		cy.visit('/login')
		cy.get('input[name="email"]').type(override?.email || 'test-e2e@mail.com')
		cy.get('input[name="password"]').type(override?.password || '123456789')
		cy.get('button[type="submit"]').click()
		cy.wait(2000)
	},{
		validate: () => {
			cy.getCookie('@finance_app-token').should('exist')
		},
	})
})

Cypress.Commands.add('selectOption', (selector: string, option: string) => {
	cy.get(selector).within($el => {
		cy.wrap($el).click().find('div[tabindex*="-1"]').contains(option).click()
	})
})

Cypress.Commands.add('createCard', (cardName: string) => {
	cy.visit('/registrations/cards')
	cy.get('input[name="name"]').type(cardName)
	cy.selectOption('#flag', 'Visa')
	cy.get('input[name="turningDay"]').type('10')
	cy.get('input[name="dueDay"]').type('20')
	cy.get('button[type="submit"]').click()
	cy.contains('Cartão cadastrado com sucesso!')
})

Cypress.Commands.add('createExpense', (props: CreateExpenseProps) => {
	cy.visit(`/registrations/expenses`)
	cy.get('input[name="name"]').type(props.expenseName)
	cy.get('input[name="purchaseDate"]').type('2025-06-13')
	cy.get('input[name="manualExpenseDate"]').type(`${props.expenseYear}-${(props.expenseMonth + 1).toString().padStart(2, '0')}`)
	cy.selectOption('#paymentMethod', props.cardName)
	cy.get('input[name="totalValue"]').type('100')
	cy.get('button[type="submit"]').click()
	cy.contains('Despesa criada com sucesso!')
})

Cypress.Commands.add('createSharePeople', (sharePersonName: string, sharePersonWhatsapp: string, sharePersonBetterDayToSendInvoice: string) => {
	cy.visit('/registrations/share-people')
	cy.get('input[name="name"]').type(sharePersonName)
	cy.get('input[name="whatsapp"]').type(sharePersonWhatsapp)
	cy.selectOption('#betterDayToSendInvoice', sharePersonBetterDayToSendInvoice)
	cy.get('button[type="submit"]').click()
	cy.contains('Pessoa cadastrada com sucesso!')
})

Cypress.Commands.add('findInLineTable', (selector: string, text: string) => {
	cy.contains(selector).within((el) => {
		cy.wrap(el).parent().contains(text)
	})
})

Cypress.Commands.add('clickInLineTable', (selector: string, findSelector: string) => {
	cy.contains(selector).within((el) => {
		cy.wrap(el).parent().find(findSelector).click()
	})
})

interface CreateExpenseProps {
	expenseName: string
	cardName: string
	expenseMonth: number
	expenseYear: number
}

declare global {
  namespace Cypress {
    interface Chainable {
      login(override?: { email?: string, password?: string }): Chainable<void>
      selectOption(selector: string, option: string): Chainable<void>
      createCard(cardName: string): Chainable<void>
      createExpense(props: CreateExpenseProps): Chainable<void>
      createSharePeople(sharePersonName: string, sharePersonWhatsapp: string, sharePersonBetterDayToSendInvoice: string): Chainable<void>
      findInLineTable(selector: string, text: string): Chainable<void>
      clickInLineTable(selector: string, findSelector: string): Chainable<void>
    }
  }
}