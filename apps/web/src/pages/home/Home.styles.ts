import styled from 'styled-components';

export const HomeContainer = styled.div`
	width: 100%;
	height: 800px;
`;

export const HomeExpensesHeader = styled.header`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	margin-bottom: 1.5rem;

	@media (max-width: ${({ theme }) => theme.breakpoints.tabletMax}) {
		margin-bottom: 0.75rem;
	}

	h2 {
		margin-right: auto;
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.mobileMax}) {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: center;

		h2 {
			margin-right: 0;
			font-size: ${({ theme }) => theme.fontSizes.medium};
		}

		> :last-child {
			grid-column: 1 / -1;
			justify-self: stretch;
		}
	}
`;

export const GoToCurrentMonthAndYearButton = styled.button`
	all: unset;
	border: 1px solid ${props => props.theme.colors.gray100};
	background: ${props => props.theme.colors.white};
	color: ${props => props.theme.colors.green500};
	padding: 0.5rem 1rem;
	font-weight: 500;
	border-radius: 8px;
	font-size: ${props => props.theme.fontSizes.regular};
	margin-right: 1rem;
	cursor: pointer;
	transition: border-color 0.2s;

	&:hover {
		border-color: ${props => props.theme.colors.green500};
	}

	&:focus {
		outline: 1px solid ${props => props.theme.colors.green500};
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.tabletMax}) {
		margin-right: 0;
	}
`;
