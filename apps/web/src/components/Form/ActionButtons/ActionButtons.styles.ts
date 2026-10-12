import styled from 'styled-components';

export const ButtonsContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 0.5rem;

	@media (max-width: ${({ theme }) => theme.breakpoints.mobileMax}) {
		flex-wrap: wrap;
	}
`;
