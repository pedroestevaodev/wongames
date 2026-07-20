'use client';

import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import * as CheckboxStyles from '@/components/Checkbox/styles';
import * as RadioStyles from '@/components/Radio/styles';
import * as HeadingStyles from '@/components/Heading/styles';

export const IconContainer = styled.div`
	cursor: pointer;
	width: 2.4rem;
	height: 2.4rem;

	@media (min-width: 768px) {
		display: none;
	}
`;

export const Content = styled.div`
	flex: 1;
	overflow-y: auto;
	padding: 0 2.4rem;
	margin-top: 5.6rem;
	margin-bottom: 2rem;
	transition: transform 0.3s ease-in-out;

	@media (min-width: 768px) {
		overflow-y: initial;
		padding: 0;
		margin-top: 0;
		margin-bottom: 0;
	}
`;

export const Overlay = styled.div`
	position: absolute;
	opacity: 0;
	transition: opacity 0.3s ease-in-out;
`;

export const Items = styled.div`
	& > div:not(:last-of-type) {
		margin-bottom: 1.6rem;
	}

	& + div {
		border-top: 0.1rem solid ${rgba('#8F8F8F', 0.2)};
		margin-top: 2.4rem;
		padding-top: 1.6rem;
	}
`;

export const Footer = styled.div`
	box-shadow: 0 -0.2rem 0.4rem ${rgba('#030517', 0.2)};
	padding: 2.4rem;

	@media (min-width: 768px) {
		display: none;
	}
`;

const wrapperModifiers = {
	open: () => css`
		position: fixed;
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		top: 0;
		left: 0;
		z-index: 40;

		${Overlay} {
			background-color: #fff;
			top: 0;
			left: 0;
			position: fixed;
			width: 100%;
			height: 100vh;
			opacity: 1;
			z-index: 40;
		}

		${Content} {
			margin-top: 3.2rem;
			transform: translateY(0);
			overflow-y: scroll;
		}

		${Content}, ${Footer}, ${IconContainer} {
			z-index: 40;
		}

		${HeadingStyles.HeadingContainer} {
			color: #030517;
			font-size: 2rem;
			font-weight: 400;
		}

		${RadioStyles.Label},
		${CheckboxStyles.Label} {
			color: #030517;
		}

		${IconContainer} {
			color: #030517;

			> svg {
				position: absolute;
				width: 30px;
				right: 0.8rem;
				top: 0.8rem;

				&:first-child {
					display: none;
				}
			}
		}
	`,
	close: () => css`
		${IconContainer} {
			color: #fafafa;

			> svg:last-child {
				display: none;
			}
		}

		${Content} {
			transform: translateY(3rem);
			height: 0;
		}

		${Content}, ${Footer} {
			position: absolute;
			visibility: hidden;
			left: 0;
		}
	`
};

type ExploreSidebarStyleProps = {
	$isOpen: boolean;
};

export const ExploreSidebarContainer = styled.div<ExploreSidebarStyleProps>`
	${({ $isOpen }) => css`
		@media (max-width: 767px) {
			${!!$isOpen && wrapperModifiers.open()}
			${!$isOpen && wrapperModifiers.close()}
		}
	`}
`;
