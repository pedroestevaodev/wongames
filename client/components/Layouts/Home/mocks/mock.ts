import { HomeLayoutProps } from '..';
import bannerSliderItems from '@/components/BannerSlider/mocks/mock';
import gameCardSliderItems from '@/components/GameCardSlider/mocks/mock';
import highlightItems from '@/components/Highlight/mocks/mock';

const homeLayoutMock: HomeLayoutProps = {
	banners: bannerSliderItems,
	newGamesTitle: 'New Games',
	newGames: gameCardSliderItems,
	mostPopularGamesTitle: 'Most Popular',
	mostPopularHighlight: highlightItems,
	mostPopularGames: gameCardSliderItems,
	upcomingGamesTitle: 'Upcomming',
	upcomingHighlight: highlightItems,
	upcomingGames: gameCardSliderItems,
	freeGamesTitle: 'Free Games',
	freeHighlight: highlightItems,
	freeGames: gameCardSliderItems
};

export default homeLayoutMock;
