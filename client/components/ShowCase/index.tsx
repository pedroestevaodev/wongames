import React from 'react';
import * as S from './styles';
import Highlight, { HighlightProps } from '../Highlight';
import { GameCardProps } from '../GameCard';
import Heading from '../Heading';
import GameCardSlider from '../GameCardSlider';

export type ShowCaseProps = {
	title?: string;
	highlight?: HighlightProps;
	games?: GameCardProps[];
	color?: 'black' | 'white';
};

const ShowCase = ({
	title,
	highlight,
	games,
	color = 'white'
}: ShowCaseProps) => {
	return (
		<S.ShowCaseContainer>
			{!!title && (
				<Heading lineLeft lineColor="secondary">
					{title}
				</Heading>
			)}

			{!!highlight && <Highlight {...highlight} />}

			{!!games && <GameCardSlider items={games} color={color} />}
		</S.ShowCaseContainer>
	);
};

export default ShowCase;
