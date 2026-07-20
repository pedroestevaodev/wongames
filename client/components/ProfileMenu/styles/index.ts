'use client';

import styled, { css } from 'styled-components';
import Link from 'next/link';
import { DefaultTheme } from "styled-components/dist/types";
import media from "styled-media-query";

type MenuProps = {
	$isActive?: boolean;
};

const menuModifiers = {
	default: (theme: DefaultTheme) => css`
		background: ${theme.colors.white};
		color: ${theme.colors.black};
	`,
	active: (theme: DefaultTheme) => css`
		background: ${theme.colors.primary};
		color: ${theme.colors.white};
	`,
};

export const ProfileMenuContainer = styled.nav`
	${({ theme }) => css`
		display: flex;
		border-bottom: 0.1rem solid ${theme.colors.lightGray};

		${media.greaterThan('medium')`
			flex-direction: column;
			border: 0;

			a:not(:last-child) {
				border-bottom: 0.1rem solid ${theme.colors.lightGray};
			}
		`}
	`}
`;

export const Menu = styled(Link) <MenuProps>`
	${({ theme, $isActive }) => css`
		display: flex;
		align-items: center;
		text-decoration: none;
		padding: ${theme.spacings.xsmall} ${theme.spacings.small};
		transition: background-color, color, ${theme.transition.default};

		&:hover {
			background-color: ${theme.colors.primary};
      		color: ${theme.colors.white};
		}

		> span {
			margin-left: ${theme.spacings.xsmall};
		}

		${media.lessThan('medium')`
			justify-content: center;
			flex: 1;

			> span {
				display: none;
			}
		`}

		${!$isActive && menuModifiers.default(theme)};
    	${$isActive && menuModifiers.active(theme)};
	`}
`;

export const MenuLogout = styled.button<MenuProps>`
	${({ theme, $isActive }) => css`
		display: flex;
		align-items: center;
		text-decoration: none;
		padding: ${theme.spacings.xsmall} ${theme.spacings.small};
		transition: background-color, color, ${theme.transition.default};

		&:hover {
			background-color: ${theme.colors.primary};
      		color: ${theme.colors.white};
		}

		> span {
			margin-left: ${theme.spacings.xsmall};
		}

		${media.lessThan('medium')`
			justify-content: center;
			flex: 1;

			> span {
				display: none;
			}
		`}

		${!$isActive && menuModifiers.default(theme)};
    	${$isActive && menuModifiers.active(theme)};
	`}
`;

export const MenuLabel = styled.span``;
