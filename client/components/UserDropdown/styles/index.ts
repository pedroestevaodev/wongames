'use client';

import Link from 'next/link';
import styled, { css } from 'styled-components';
import { DropdownContainer, Title } from '@/components/Dropdown/styles';

export const UserDropdownContainer = styled.div`
	${DropdownContainer} {
		.arrow-down {
			margin-left: -5px;
		}

		${Title} {
			padding-right: 0px;
		}
	}
`;

export const Nav = styled.nav`
	${({ theme }) => css`
		display: flex;
		flex-direction: column;
		width: 26rem;

		a:not(:last-child) {
			border-bottom: 0.1rem solid ${theme.colors.lightGray};
		}
	`}
`;

export const Username = styled.span`
	${({ theme }) => css`
		padding: 0 ${theme.spacings.xxsmall};
	`}
`;

export const UserDropdownLink = styled(Link)`
	${({ theme }) => css`
		display: flex;
		align-items: center;
		text-decoration: none;
		background-color: ${theme.colors.white};
		color: ${theme.colors.black};
		padding: ${theme.spacings.xsmall} ${theme.spacings.small};
		transition:
			background-color,
			color,
			0.3s ease-in-out;

		&:hover {
			background: ${theme.colors.primary};
			color: ${theme.colors.white};
		}

		> svg {
			width: ${theme.spacings.small};
			height: ${theme.spacings.small};
		}

		> span {
			margin-left: ${theme.spacings.xsmall};
		}
	`}
`;

export const UserDropdownLogout = styled.button`
	${({ theme }) => css`
		display: flex;
		align-items: center;
		text-decoration: none;
		background-color: ${theme.colors.white};
		color: ${theme.colors.black};
		padding: ${theme.spacings.xsmall} ${theme.spacings.small};
		transition:
			background-color,
			color,
			0.3s ease-in-out;

		&:hover {
			background: ${theme.colors.primary};
			color: ${theme.colors.white};
		}

		> svg {
			width: ${theme.spacings.small};
			height: ${theme.spacings.small};
		}

		> span {
			margin-left: ${theme.spacings.xsmall};
		}
	`}
`;

export const LinkLabel = styled.span``;
