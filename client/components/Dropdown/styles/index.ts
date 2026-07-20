'use client';

import styled, { css } from 'styled-components';

type DropdownContainerProps = {
	$isOpen?: boolean;
};

const wrapperModifiers = {
	open: () => css`
		opacity: 1;
		pointer-events: auto;
		margin-right: -2.2rem;
		transform: translateY(0);
		visibility: visible;
	`,
	close: () => css`
		opacity: 0;
		pointer-events: none;
		transform: translateY(-2rem);
		visibility: hidden;
	`
};

export const DropdownContainer = styled.div<DropdownContainerProps>`
	${({ theme, $isOpen }) => css`
		position: relative;
		width: max-content;

		${Content},
		${Overlay} {
			transition:
				transform 0.2s ease-in,
				opacity ${theme.transition.default};

			${$isOpen && wrapperModifiers.open()}
			${!$isOpen && wrapperModifiers.close()}
		}
	`}
`;

export const Title = styled.div`
	${({ theme }) => css`
		position: relative;
		display: flex;
		align-items: center;
		cursor: pointer;
		color: ${theme.colors.white};
		padding-right: 2.4rem;
		z-index: ${theme.layers.alwaysOnTop};
	`}
`;

export const Content = styled.div`
	${({ theme }) => css`
		position: absolute;
		right: 0;
		display: flex;
		flex-direction: column;
		background-color: ${theme.colors.white};
		border-radius: 6px;
		color: ${theme.colors.black};
		cursor: auto;
		margin-top: ${theme.spacings.small};
		z-index: ${theme.layers.alwaysOnTop};

		&::before {
			content: '';
			position: absolute;
			top: -1.2rem;
			right: ${theme.spacings.small};
			border-right: 1.2rem solid transparent;
			border-left: 1.2rem solid transparent;
			border-bottom: 1.2rem solid ${theme.colors.white};
		}
	`}
`;

export const Overlay = styled.div`
	${({ theme }) => css`
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: ${theme.layers.overlay};
	`}
`;
