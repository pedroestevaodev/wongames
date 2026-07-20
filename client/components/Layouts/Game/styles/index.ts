'use client';

import styled from 'styled-components';
import Container from '@/components/Container';

export const Main = styled.main`
	margin-top: 20rem;

	@media (min-width: 768px) {
		margin-top: 45rem;
	}
`;

type CoverProps = {
	$src: string;
};

export const Cover = styled.div<CoverProps>`
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	height: 39.5rem;
	background-image: url(${({ $src }) => $src});
	background-size: cover;
	background-position: top center;
	opacity: 0.4;

	@media (min-width: 768px) {
		height: 70rem;
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0 85%);
	}
`;

export const Section = styled(Container).attrs({ as: 'section' })`
	margin-bottom: 4.8rem;

	@media (min-width: 768px) {
		margin-bottom: calc(4.8rem * 2);
	}
`;

export const SectionGameInfo = styled(Section)``;

export const SectionGallery = styled(Section)`
	display: none;

	@media (min-width: 768px) {
		display: block;
	}
`;

export const SectionDescription = styled(Section)`
	.description__copyrights {
		color: #8f8f8f;
		font-size: 1.2rem;
		margin-top: 3.2rem;
	}
`;

export const SectionGameDetails = styled(Section)``;
