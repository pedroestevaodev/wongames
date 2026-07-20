'use client';

import styled, { css } from 'styled-components';

export const GameCardSliderContainer = styled.section<{ $color: 'white' | 'black' }>`
	${({ $color }) => css`
		@media (max-width: 1399px) {
			overflow-x: hidden;
		}

		.slick-track,
		.slick-list {
			display: flex;
		}

		.slick-slide > div {
			margin: 0 0.8rem;
			flex: 1 0 auto;
			height: 100%;
		}

		.slick-list {
			margin: 0 -0.8rem;
		}

		@media (min-width: 1200px) {
			.slick-slide > div {
				margin: 0 1.6rem;
			}
			.slick-list {
				margin: 0 -1.6rem;
			}
		}

		.slick-prev,
		.slick-next {
			display: block;
			color: ${$color};
			cursor: pointer;
			position: absolute;
			top: 50%;
			width: 3.5rem;
			height: 3.5rem;
			padding: 0;
			transform: translate(0, -50%);
		}
		.slick-prev {
			left: -5.6rem;
		}
		.slick-next {
			right: -5.6rem;
		}
		.slick-prev.slick-disabled,
		.slick-next.slick-disabled {
			visibility: hidden;
		}
	`}
`;
