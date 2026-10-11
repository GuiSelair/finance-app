import Link from 'next/link';
import styled from 'styled-components';

export const NavigationDropmenuRoot = styled.span`
	display: none;

	@media (max-width: ${({ theme }) => theme.breakpoints.tabletMax}) {
		display: flex;
		align-items: center;
		margin-right: 16px;
	}
`;

export const HamburgerButton = styled.button`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 2.5rem;
	height: 2.5rem;
	padding: 0;
	background: transparent;
	border: none;
	border-radius: ${({ theme }) => theme.radius.regular};
	color: ${({ theme }) => theme.colors.green100};

	&:hover,
	&[data-state='open'] {
		background: ${({ theme }) => theme.colors.green500};
	}

	&:focus-visible {
		outline: 2px solid ${({ theme }) => theme.colors.green300};
	}
`;

export const MenuLink = styled(Link)`
	display: block;
	width: 100%;
	color: ${({ theme }) => theme.colors.gray600};

	&[aria-current='page'] {
		background-color: ${({ theme }) => theme.colors.green100};
		color: ${({ theme }) => theme.colors.green800};
		font-weight: 600;
	}

	&[data-separated] {
		margin-top: 0.25rem;
		border-top: 1px solid ${({ theme }) => theme.colors.gray100};
		padding-top: 0.75rem;
	}
`;
