'use client';

import styled, { css } from 'styled-components';
import * as HeadingStyles from '@/components/Heading/styles';

export const HomeConstainer = styled.div``;

export const SectionBanner = styled.section`
	${() => css`
		margin: 0 calc(-3.2rem / 2) 4rem;

		@media (min-width: 768px) {
			position: relative;
			margin-bottom: 4rem;
			z-index: 10;
		}
	`}
`;

export const SectionNews = styled.div`
	${() => css`
		margin-bottom: calc(5.6rem * 2);

		@media (min-width: 1200px) {
			margin-top: -13rem;
		}

		/* @media (min-width: 768px) { */
		margin-bottom: 0;
		padding-top: 14rem;
		padding-bottom: 10rem;
		background-color: #f2f2f2;
		clip-path: polygon(0 0, 100% 15%, 100% 100%, 0 85%);

		${HeadingStyles.HeadingContainer} {
			color: #030517;
		}
		/* } */
	`}
`;
