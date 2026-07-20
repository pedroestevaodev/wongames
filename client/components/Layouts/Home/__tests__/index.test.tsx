import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import Home from '@/components/Layouts/Home';
import bannerSliderItems from "@/components/BannerSlider/mocks/mock";
import gameCardSliderItems from "@/components/GameCardSlider/mocks/mock";
import highlightItems from "@/components/Highlight/mocks/mock";

const props = {
    banners: bannerSliderItems,
    newGamesTitle: 'News',
    newGames: gameCardSliderItems,
    mostPopularGamesTitle: 'Most Popular',
    mostPopularHighlight: highlightItems,
    mostPopularGames: gameCardSliderItems,
    upcomingGamesTitle: 'Upcoming',
    upcomingGames: gameCardSliderItems,
    upcomingHighlight: highlightItems,
    freeGamesTitle: 'Free Games',
    freeGames: gameCardSliderItems,
    freeHighlight: highlightItems
};

jest.mock('@/components/Layouts/Base', () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="Mock Base">{children}</div>
    ),
}));

jest.mock('@/components/ShowCase', () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="mock-showcase">{children}</div>
    ),
}));

jest.mock('@/components/BannerSlider', () => ({
    __esModule: true,
    default: () => <div data-testid="mock-banner-slider" />,
}));

describe('<Home />', () => {
    it('should render sections', () => {
        render(<Home {...props} />)

        expect(screen.getByTestId('mock-banner-slider')).toBeInTheDocument();
        expect(screen.getAllByTestId('mock-showcase')).toHaveLength(4);
    });
});