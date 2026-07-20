import gameCardSliderItems from '@/components/GameCardSlider/mocks/mock';
import highlightItems from '@/components/Highlight/mocks/mock';
import { CartLayoutProps } from '..';

const cartPageMock: CartLayoutProps = {
	session: {
		user: {
			id: '1',
			name: 'John Doe',
			email: 'john.doe@example.com',
		},
		expires: '',
	},
	recommendedTitle: 'You may like these games',
	recommendedGames: gameCardSliderItems,
	recommendedHighlight: highlightItems
};

export default cartPageMock;
