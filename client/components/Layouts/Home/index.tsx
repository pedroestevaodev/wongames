import React from 'react';
import * as S from '@/components/Layouts/Home/styles';
import Base from '../Base';
import Container from '@/components/Container';
import BannerSlider from '@/components/BannerSlider';
import ShowCase from '@/components/ShowCase';
import { BannerProps } from '@/components/Banner';
import { GameCardProps } from '@/components/GameCard';
import { HighlightProps } from '@/components/Highlight';

export type HomeLayoutProps = {
	banners: BannerProps[];
	newGamesTitle: string;
	newGames: GameCardProps[];
	mostPopularGamesTitle: string;
	mostPopularHighlight: HighlightProps;
	mostPopularGames: GameCardProps[];
	upcomingGamesTitle: string;
	upcomingHighlight: HighlightProps;
	upcomingGames: GameCardProps[];
	freeGamesTitle: string;
	freeGames: GameCardProps[];
	freeHighlight: HighlightProps;
};

const Home = ({
	banners,
	newGamesTitle,
	newGames,
	mostPopularGamesTitle,
	mostPopularHighlight,
	mostPopularGames,
	upcomingGamesTitle,
	upcomingHighlight,
	upcomingGames,
	freeGamesTitle,
	freeHighlight,
	freeGames
}: HomeLayoutProps) => {
	return (
		<Base>
			<Container>
				<S.SectionBanner>
					<BannerSlider items={banners} />
				</S.SectionBanner>
			</Container>

			<S.SectionNews>
				<ShowCase title={newGamesTitle} games={newGames} color="black" />
			</S.SectionNews>

			<ShowCase
				title={mostPopularGamesTitle}
				highlight={mostPopularHighlight}
				games={mostPopularGames}
			/>

			<ShowCase
				title={freeGamesTitle}
				highlight={freeHighlight}
				games={freeGames}
			/>

			<ShowCase
				title={upcomingGamesTitle}
				highlight={upcomingHighlight}
				games={upcomingGames}
			/>
		</Base>
	);
};

export default Home;
