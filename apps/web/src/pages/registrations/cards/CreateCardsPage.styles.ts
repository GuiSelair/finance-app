import { CreditCard } from 'phosphor-react';
import styled from 'styled-components';

export const RegisterCardsForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const CardFieldsRow = styled.div`
	display: flex;
	gap: 1.5rem;

	@media (max-width: ${({ theme }) => theme.breakpoints.mobileMax}) {
		flex-direction: column;

		> * {
			flex: none;
			width: 100%;
		}
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.tabletMin}) and (max-width: ${({ theme }) =>
			theme.breakpoints.tabletMax}) {
		flex-wrap: wrap;

		> * {
			flex: 1 1 calc(50% - 0.75rem);
			max-width: calc(50% - 0.75rem);
		}
	}
`;

export const CreditCardIcon = styled(CreditCard)`
	width: 2rem;
	height: 2rem;
	color: ${({ theme }) => theme.colors.green800};
	margin-top: 1rem;
	margin-left: 0.5rem;
`;
