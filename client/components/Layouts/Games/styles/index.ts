'use client';

import styled, { css } from 'styled-components';
import Container from '@/components/Container';
import media from "styled-media-query";
import { darken } from "polished";

export const Main = styled(Container)`
	${({ theme }) => css`
		${media.greaterThan('medium')`
			display: grid;
			grid-template-columns: 26rem 1fr;
			gap: ${theme.grid.gutter};
		`}
	`}
`;

export const ShowMore = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: fit-content;
	margin: 5.2rem auto 0;
	padding: 0px;
	color: #fafafa;
	text-align: center;
	text-transform: uppercase;
	font-weight: bold;
	cursor: pointer;

	> svg {
		color: #f231a5;
	}
`;

export const ShowMoreButton = styled.button<{ $isPending: boolean }>`
	${({ theme, $isPending }) => css`
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: fit-content;
		margin: 1rem auto 0;
		padding: 1rem;
		color: ${theme.colors.white};
		text-align: center;
		text-transform: uppercase;
		font-weight: bold;
		cursor: pointer;
		pointer-events: ${$isPending ? 'none' : 'all'};
		transition: color ${theme.transition.default};

		> svg {
			color: #f231a5;
			transition: color ${theme.transition.default};
		}

		&:hover {
			color: ${darken(0.3, theme.colors.white)};

			> svg {
				color: ${darken(0.2, theme.colors.primary)};
			}
		}
	`}
`;

export const ShowMoreLoading = styled.img`
	width: 4rem;
`;