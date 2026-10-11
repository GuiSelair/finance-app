import styled from 'styled-components';

export const TableScroll = styled.div`
	width: 100%;
	overflow-x: auto;
`;

export const Table = styled.table`
	width: 100%;
	border-collapse: separate;
	border-spacing: 0 0.5rem;
	text-align: left;
	margin-top: 1rem;

	@media (max-width: ${({ theme }) => theme.breakpoints.tabletMax}) {
		width: max-content;
		min-width: 100%;
	}
`;

export const TableHeadCell = styled.th`
	font-weight: 400;
	color: ${props => props.theme.colors.gray300};
	border-bottom: 1px solid ${props => props.theme.colors.gray100};
	padding-bottom: 0.5rem;
	width: auto;

	@media (max-width: ${({ theme }) => theme.breakpoints.tabletMax}) {
		width: auto !important;
		min-width: 7.5rem;
		white-space: nowrap;
		padding-right: 1.25rem;

		&:last-child {
			padding-right: 0;
		}
	}
`;

export const TableCell = styled.td`
	width: auto;
	padding: 0.5rem 0.5rem 0.5rem 0;
	max-width: 150px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

	@media (max-width: ${({ theme }) => theme.breakpoints.tabletMax}) {
		width: auto !important;
		max-width: none;
		min-width: 7.5rem;
		padding-right: 1.25rem;

		&:last-child {
			padding-right: 0;
		}
	}
`;

export const TableRow = styled.tr`
	&:nth-child(even) {
		background-color: #fafafa;
	}
`;
