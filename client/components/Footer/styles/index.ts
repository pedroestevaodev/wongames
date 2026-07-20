'use client';

import styled from 'styled-components';
import * as HeadingStyles from '@/components/Heading/styles';
import { darken } from 'polished';

export const FooterContainer = styled.footer`
	${HeadingStyles.HeadingContainer} {
		text-transform: uppercase;
	}
`;

export const Content = styled.div`
	display: grid;
	grid-template-columns: minmax(auto, 50%) 1fr;
	gap: 3.2rem;
	margin-top: 3.2rem;

	@media (min-width: 768px) {
		grid-template-columns: repeat(4, 1fr);
	}
`;

export const Column = styled.div`
	a,
	span {
		display: block;
		color: ${darken(0.2, '#8F8F8F')};
		font-size: 1.6rem;
		margin-bottom: 0.8rem;
		text-decoration: none;
	}

	a {
		word-wrap: break-word;
		overflow-wrap: break-word;

		&:hover {
			text-decoration: underline;
		}
	}
`;

export const Copyright = styled.div`
	color: #8f8f8f;
	font-size: 1.2rem;
	margin-top: 4rem;
	margin-bottom: 3.2rem;
	text-align: center;
`;
