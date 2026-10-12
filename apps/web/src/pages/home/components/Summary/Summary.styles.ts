import styled from 'styled-components';

export const SummaryContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 74px;
	align-items: center;
	margin-bottom: 2.5rem;

	@media (max-width: ${({ theme }) => theme.breakpoints.tabletMax}) {
		display: flex;
		flex-wrap: nowrap;
		gap: 1rem;
		overflow-x: auto;
		margin-bottom: 1.5rem;

		> article {
			flex: 0 0 16rem;
			min-width: 16rem;
		}
	}
`;
