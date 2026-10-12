import styled from 'styled-components';

export const SessionContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	margin: 3.375rem 0 4rem;

	@media (max-width: ${({ theme }) => theme.breakpoints.tabletMax}) {
		gap: 1rem;
		margin: 2rem 0 2.5rem;
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.mobileMax}) {
		align-items: center;
		margin: 1.5rem 0 2rem;
	}
`;

export const SessionDetails = styled.div`
	display: flex;
	align-items: center;

	h1 {
		font-size: ${props => props.theme.fontSizes['2xl']};
		color: ${props => props.theme.colors.white};
		font-weight: 600;
		line-height: 100%;
		letter-spacing: -0.05em;
		display: inline-block;
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.tabletMax}) {
		flex-wrap: wrap;
		gap: 0.5rem;

		h1 {
			font-size: ${({ theme }) => theme.fontSizes.large};
		}
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.mobileMax}) {
		align-items: center;
		flex-wrap: wrap;

		h1 {
			font-size: 1.75rem;
		}
	}
`;

export const Welcome = styled.span`
	margin-left: 1rem;
	padding-left: 0.5rem;
	border-left: 1px solid ${props => props.theme.colors.green200};
	font-size: ${props => props.theme.fontSizes.medium};
	color: ${props => props.theme.colors.green200};
	line-height: 100%;
	letter-spacing: -0.05em;

	> strong {
		font-weight: 700;
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.mobileMax}) {
		margin-left: 0;
		padding-left: 0;
		border-left: none;
		white-space: nowrap;
	}
`;

export const SessionNavigation = styled.nav`
	@media (max-width: ${({ theme }) => theme.breakpoints.tabletMax}) {
		display: none;
	}
`;
