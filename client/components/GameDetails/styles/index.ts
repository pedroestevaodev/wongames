'use client';

import styled from 'styled-components';

export const GameDetailsContainer = styled.div`
	margin: 2.4rem 0;
`;

export const Content = styled.div`
	display: grid;
	gap: 1.6rem;
	grid-template-columns: repeat(2, 1fr);
	margin-top: 2.4rem;

	@media (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (min-width: 1400px) {
		grid-template-columns: repeat(6, 1fr);
	}
`;

export const Block = styled.div``;

export const Label = styled.h3`
	font-size: 1.4rem;
	font-weight: 300;
	color: #fafafa;
`;

export const Description = styled.p`
	font-size: 1.6rem;
	font-weight: 600;
	color: #fafafa;
`;

export const IconsWrapper = styled.div`
	display: flex;
	align-items: center;
	color: #fafafa;
`;

export const Icon = styled.span`
	margin-left: 0.8rem;

	&:first-child {
		margin-left: 0;
	}
`;
