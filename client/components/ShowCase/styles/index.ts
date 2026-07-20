'use client';

import styled from 'styled-components';
import Container from '@/components/Container';
import * as GameCardSliderStyle from '@/components/GameCardSlider/styles';
import * as HeadingStyles from '@/components/Heading/styles';
import * as HighlightStyles from '@/components/Highlight/styles';

export const ShowCaseContainer = styled(Container).attrs({ as: 'section' })`
	${HeadingStyles.HeadingContainer},
	${HighlightStyles.HighlightContainer},
    ${GameCardSliderStyle.GameCardSliderContainer} {
		margin-bottom: 3.2rem;
	}

	${HighlightStyles.HighlightContainer} {
		@media (max-width: 767px) {
			margin-right: calc(-3.2rem / 2);
			margin-left: calc(-3.2rem / 2);
		}
	}

	${GameCardSliderStyle.GameCardSliderContainer} {
		@media (max-width: 1399px) {
			margin-right: calc(-3.2rem / 2);
		}
	}

	margin-bottom: calc(4rem * 2);
`;
