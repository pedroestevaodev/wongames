'use client';

import styled, { css } from 'styled-components';
import Image from 'next/image';
import media from "styled-media-query";

type HighlightStyleProps = {
	$alignment?: 'right' | 'left';
};

const highlightModifiers = {
	right: () => css`
		grid-template-areas: 'floatimage content';
		grid-template-columns: 1.3fr 2fr;

		${Content} {
			text-align: right;
		}

		${FloatImageWrapper} {
			margin-left: 2rem;
			justify-content: flex-start;
		}
	`,
	left: () => css`
		grid-template-areas: 'content floatimage';
		grid-template-columns: 2fr 1.3fr;

		${Content} {
			text-align: left;
		}

		${FloatImageWrapper} {
			margin-right: 2rem;
			justify-content: flex-end;
		}
	`,
};

export const HighlightContainer = styled.section<HighlightStyleProps>`
	${({ $alignment }) => css`
		position: relative;
		height: 23rem;
		display: grid;
		margin-bottom: 3.2rem;

		&::after {
			content: '';
			position: absolute;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.6);
		}

		img {
			position: absolute;
			object-fit: cover;
		}

		${media.greaterThan('medium')`
			height: 32rem;
		`}

		${highlightModifiers[$alignment!]()}
	`}
`;

export const FloatImageWrapper = styled.div`
	${({ theme }) => css`
		display: flex;
		grid-area: floatimage;
		z-index: ${theme.layers.base};
		height: 100%;
		max-height: 23rem;
		max-width: 100%;
		align-self: end;

		img {
			position: relative;
			object-fit: contain;
			width: fit-content;
		}

		${media.greaterThan('medium')`
			max-height: 32rem;
		`}
	`}
`;

export const FloatImage = styled(Image)`
	grid-area: floatimage;
	width: auto;
`;

export const Content = styled.div`
	${({ theme }) => css`
		grid-area: content;
		z-index: ${theme.layers.base};
		padding: ${theme.spacings.xsmall};

		${media.greaterThan('medium')`
			align-self: end;
			padding: ${theme.spacings.large};
		`}
	`}
`;

export const Title = styled.h2`
	${({ theme }) => css`
		font-size: ${theme.font.sizes.large};
		font-weight: ${theme.font.bold};
		color: ${theme.colors.white};

		${media.greaterThan('medium')`
			font-size: ${theme.font.sizes.xxlarge};
		`}
	`}
`;

export const SubTitle = styled.h3`
	${({ theme }) => css`
		font-size: ${theme.font.sizes.small};
		font-weight: ${theme.font.light};
		color: ${theme.colors.white};
		margin-bottom: ${theme.spacings.medium};

		${media.greaterThan('medium')`
			font-size: ${theme.font.sizes.large};
		`}
	`}
`;
