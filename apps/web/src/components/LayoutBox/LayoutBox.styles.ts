import styled from 'styled-components';

import { Flex } from '../Flex';

export const LayoutBoxContainer = styled.main`
	background: ${props => props.theme.colors.white};
	padding: 1.5rem;
	border-radius: 8px;
	min-height: 500px;
	display: flex;
	flex-direction: column;
`;

export const LayoutBoxTitle = styled.h2`
	font-weight: 600;
	font-size: 2rem;
	line-height: 1.2;
	letter-spacing: -0.05em;
	color: ${({ theme }) => theme.colors.green800};
	min-width: 0;

	@media (max-width: ${({ theme }) => theme.breakpoints.tabletMax}) {
		font-size: ${({ theme }) => theme.fontSizes.medium};
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.mobileMax}) {
		font-size: 1.25rem;
	}
`;

export const LayoutBoxHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.75rem;
	margin-bottom: 1.5rem;
	flex-wrap: nowrap;
`;

export const LayoutBoxHeaderButtonsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 0.5rem;
	flex: 1 1 auto;
	min-width: 0;
	flex-wrap: wrap;
`;

export const LayoutBoxContent = styled(Flex)`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

export const LayoutBoxFooter = styled(Flex).attrs({ as: 'footer' })`
	height: 60px;
	width: 100%;
	display: flex;
	align-items: center;

	@media (max-width: ${({ theme }) => theme.breakpoints.mobileMax}) {
		height: auto;
		min-height: 60px;
		padding-top: 0.5rem;
	}
`;

export const LayoutBoxFooterLeftSide = styled(Flex)`
	justify-content: flex-start;
	width: inherit;
`;

export const LayoutBoxFooterRightSide = styled(Flex)`
	justify-content: flex-end;
	width: inherit;
`;
