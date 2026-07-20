import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import Wishlist from "@/components/Layouts/Wishlist";
import highlightItems from "@/components/Highlight/mocks/mock";
import gameCardSliderItems from "@/components/GameCardSlider/mocks/mock";
import { WishlistContextDefaultValues } from "@/hooks/useWishlist";

const props = {
    recommendedTitle: 'You may like these games',
    recommendedHighlight: highlightItems,
    recommendedGames: gameCardSliderItems,
};

jest.mock('@/components/Layouts/Base', () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="mock-base">{children}</div>
    ),
}));

jest.mock('@/components/Showcase', () => ({
    __esModule: true,
    default: () => <div data-testid="mock-showcase" />,
}));

describe('<Wishlist />', () => {
    it('should render correctly', () => {
        const wishlistProviderProps = {
            ...WishlistContextDefaultValues,
            items: [gameCardSliderItems[0]],
        };

        render(<Wishlist {...props} />, { wishlistProviderProps });

        expect(
            screen.getByRole('heading', { name: /wishlist/i })
        ).toBeInTheDocument();

        expect(screen.getByText(/population zero/i)).toBeInTheDocument();
        expect(screen.getByTestId('mock-showcase')).toBeInTheDocument();
    });

    it('should render empty when there are no games', () => {
        const wishlistProviderProps = {
            ...WishlistContextDefaultValues,
            items: []
        };

        render(<Wishlist {...props} />, { wishlistProviderProps });

        expect(screen.queryByText(/population zero/i)).not.toBeInTheDocument();

        expect(
            screen.getByRole('heading', { name: /your wishlist is empty/i })
        ).toBeInTheDocument();
    });
});