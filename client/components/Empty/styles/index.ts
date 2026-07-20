'use client';

import styled from 'styled-components';
import Image from 'next/image';

export const EmptyContainer = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
`;

export const EmptyImage = styled(Image)`
	max-width: 100%;
`;

export const Title = styled.h2`
	color: #f231a5;
	font-size: 2.8rem;
`;

export const Description = styled.p`
	color: #fafafa;
	font-size: 1.8rem;
	font-weight: 300;
	margin-bottom: 3.2rem;
`;
