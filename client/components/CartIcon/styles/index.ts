'use client';

import { darken } from "polished";
import styled, { css } from 'styled-components';

export const CartIconContainer = styled.button`
  ${({ theme }) => css`
		position: relative;
		background-color: transparent;
		border: none;
		cursor: pointer;
		color: ${theme.colors.white};
		display: flex;
		align-items: center;
		justify-content: center;
		width: ${theme.spacings.small};
		height: ${theme.spacings.small};
		transition: color ${theme.transition.default};

		&:hover {
			color: ${darken(0.3, theme.colors.white)};
		}
	`}
`;

export const Badge = styled.span`
	${({ theme }) => css`
		position: absolute;
		top: -0.4rem;
		right: -0.4rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: ${theme.colors.secondary};
		color: ${theme.colors.white};
		font-size: 1rem;
		border-radius: 50%;
		width: ${theme.spacings.xsmall};
		height: ${theme.spacings.xsmall};
	`}
`;
