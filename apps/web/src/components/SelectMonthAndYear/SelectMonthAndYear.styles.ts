import styled from 'styled-components';

export const SelectMonthAndYearContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;

	@media (max-width: ${({ theme }) => theme.breakpoints.mobileMax}) {
		width: 100%;

		> div {
			flex: 1;
			width: auto !important;
			min-width: 0;
		}
	}
`;
