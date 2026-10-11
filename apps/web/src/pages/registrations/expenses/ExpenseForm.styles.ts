import styled from 'styled-components';

import { TextInput } from '@/components/Form';

export const RegisterExpenseForm = styled.form`
	width: 100%;

	display: flex;
	flex-direction: column;
`;

export const ValueInput = styled(TextInput)`
	width: 136px;

	@media (max-width: ${({ theme }) => theme.breakpoints.tabletMax}) {
		width: 100%;
	}
`;

export const ExpenseValuesRow = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 1rem;
	margin-top: 1rem;

	@media (min-width: 1200px) {
		flex-wrap: nowrap;
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.tabletMax}) {
		flex-wrap: wrap;
	}
`;

export const ExpenseField = styled.div`
	@media (max-width: ${({ theme }) => theme.breakpoints.mobileMax}) {
		flex: 1 1 100%;
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.tabletMin}) and (max-width: ${({ theme }) =>
			theme.breakpoints.tabletMax}) {
		flex: 1 1 calc(50% - 0.5rem);
		max-width: calc(50% - 0.5rem);
	}
`;

export const ExpenseSwitches = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	gap: 1rem;

	@media (max-width: ${({ theme }) => theme.breakpoints.tabletMax}) {
		flex: 1 1 100%;
	}
`;

export const SubmitShortcutHint = styled.span`
	font-size: ${({ theme }) => theme.fontSizes.xs};
	font-weight: 400;
	opacity: 0.85;
`;
