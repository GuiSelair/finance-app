import { SelectMonthAndYear, SEO, LayoutBox } from '@/components';

import { useDashboard } from './hooks/useDashboard';
import { Summary } from './components/Summary';
import { ExpensesTable } from './components/ExpensesTable';
import { GoToCurrentMonthAndYearButton, HomeContainer, HomeExpensesHeader } from './Home.styles';

export default function HomePage() {
	const { fetchSummaryExpenses, handleRestoreToCurrentMonthAndYear, deleteExpense, fetchExpenses } = useDashboard();

	return (
		<>
			<SEO title="Despesas do mês" description="Consolidado mensal de despesas" />
			<HomeContainer>
				<Summary fetchSummary={fetchSummaryExpenses} />
				<LayoutBox>
					<HomeExpensesHeader>
						<LayoutBox.HeaderTitle>Despesas</LayoutBox.HeaderTitle>
						<GoToCurrentMonthAndYearButton type="button" onClick={handleRestoreToCurrentMonthAndYear}>
							Mês atual
						</GoToCurrentMonthAndYearButton>
						<SelectMonthAndYear />
					</HomeExpensesHeader>
					<LayoutBox.Content>
						<ExpensesTable fetchExpenses={fetchExpenses} deleteExpense={deleteExpense} />
					</LayoutBox.Content>
				</LayoutBox>
			</HomeContainer>
		</>
	);
}
