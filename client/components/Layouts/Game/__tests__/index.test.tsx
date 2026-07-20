import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import Game, { GameLayoutProps } from "@/components/Layouts/Game";
import GalleryMock from "@/components/Gallery/mocks/mock";
import GameInfoItens from "@/components/GameInfo/mocks/mock";
import gameDetailsMock from "@/components/GameDetails/mocks/mock";
import { GameDetailsProps } from "@/components/GameDetails";
import gameCardSliderItems from "@/components/GameCardSlider/mocks/mock";
import highlightItems from "@/components/Highlight/mocks/mock";

const props: GameLayoutProps = {
    cover: 'bg-image.jpg',
    gameInfo: GameInfoItens,
    gallery: GalleryMock,
    description: `<h1>Custom HTML</h1>`,
    details: gameDetailsMock as GameDetailsProps,
    upcomingTitle: 'Upcoming games',
    upcomingGames: gameCardSliderItems,
    upcomingHighlight: highlightItems,
    recommendedTitle: 'You may like these games',
    recommendedGames: gameCardSliderItems,
};

jest.mock('@/components/Layouts/Base', () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="Mock Base">{children}</div>
    ),
}));

jest.mock('@/components/Menu', () => ({
    __esModule: true,
    default: () => <div data-testid="Mock Menu" />,
}));

jest.mock('@/components/Gallery', () => ({
    __esModule: true,
    default: () => <div data-testid="Mock Gallery" />,
}));

jest.mock('@/components/GameDetails', () => ({
    __esModule: true,
    default: () => <div data-testid="Mock GameDetails" />,
}));

jest.mock('@/components/GameInfo', () => ({
    __esModule: true,
    default: () => <div data-testid="Mock GameInfo" />,
}));

jest.mock('@/components/Showcase', () => ({
    __esModule: true,
    default: () => <div data-testid="Mock Showcase" />,
}));

describe('<Game />', () => {
    it('should render the template with components', () => {
        render(<Game {...props} />);

        expect(screen.getByTestId('Mock Gallery')).toBeInTheDocument();
        expect(screen.getByTestId('Mock GameDetails')).toBeInTheDocument();
        expect(screen.getByTestId('Mock GameInfo')).toBeInTheDocument();
        expect(screen.getAllByTestId('Mock Showcase')).toHaveLength(2);
        expect(screen.getByText(/custom html/i)).toBeInTheDocument();
    });

    it('should not render the gallery if no images', () => {
        render(<Game {...props} gallery={undefined} />);

        expect(screen.queryByTestId('Mock Gallery')).not.toBeInTheDocument();
    });

    it('should not render the gallery on mobile', () => {
        render(<Game {...props} />);

        const galleryParent = screen.getByTestId('Mock Gallery').parentElement;

        expect(galleryParent).toHaveStyle('display: none');
    });
})