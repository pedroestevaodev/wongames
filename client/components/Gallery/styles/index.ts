'use client';

import styled, { css } from 'styled-components';

export const GalleryContainer = styled.div`
	.slick-prev,
	.slick-next {
		display: block;
		color: #fafafa;
		cursor: pointer;
		position: absolute;
		top: 50%;
		width: 2.5rem;
		height: 2.5rem;
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

	.slick-slide > div {
		margin: 0 1.6rem;
		cursor: pointer;
	}

	.slick-list {
		margin: 0 -1.6rem;
	}

	@media (max-width: 1399px) {
		overflow-x: hidden;
	}
`;

type ModalProps = {
	$isOpen: boolean;
};

const modalModifiers = {
	open: () => css`
		opacity: 1;
	`,
	close: () => css`
		opacity: 0;
		pointer-events: none;
	`
};

export const Modal = styled.div<ModalProps>`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 40;
	transition: opacity 0.3s ease-in-out;

	${({ $isOpen }) => ($isOpen ? modalModifiers.open() : modalModifiers.close())}
`;

export const Close = styled.div`
	color: #fafafa;
	position: absolute;
	right: 0;
	top: 0;
	cursor: pointer;
`;

export const Content = styled.div`
	width: 100%;
	max-width: min(120rem, 100%);
	max-height: 80rem;
`;
