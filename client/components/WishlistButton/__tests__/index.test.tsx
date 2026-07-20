import { render, screen, waitFor } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import WishlistButton from "@/components/WishlistButton";
import { useSession } from "next-auth/react";
import { WishlistContextDefaultValues } from "@/hooks/useWishlist";
import userEvent from "@testing-library/user-event";

jest.mock("next-auth/react", () => ({
    ...jest.requireActual("next-auth/react"),
    useSession: jest.fn(),
}));

describe('<WishlistButton />', () => {
    beforeEach(() => {
        (useSession as jest.Mock).mockReturnValue({
            data: { jwt: '123', user: { email: 'lorem@ipsum.com' } },
            status: 'authenticated',
        });
    });

    it('should render a button to add to wishlist', () => {
        const wishlistProviderProps = {
            ...WishlistContextDefaultValues,
            isInWishlist: () => false,
        };

        render(<WishlistButton id="1" />, { wishlistProviderProps });

        expect(screen.getByLabelText(/add to wishlist/i)).toBeInTheDocument();
    });

    it('should render a button to remove from wishlist', () => {
        const wishlistProviderProps = {
            ...WishlistContextDefaultValues,
            isInWishlist: () => true,
        };

        render(<WishlistButton id="1" />, { wishlistProviderProps });

        expect(screen.getByLabelText(/remove from wishlist/i)).toBeInTheDocument();
    });

    it('should render a button with add to wishlist text', () => {
        const wishlistProviderProps = {
            ...WishlistContextDefaultValues,
            isInWishlist: () => false,
        };

        render(<WishlistButton id="1" hasText />, { wishlistProviderProps });

        expect(screen.getByText(/add to wishlist/i)).toBeInTheDocument();
    });

    it('should render a button with remove from wishlist text', () => {
        const wishlistProviderProps = {
            ...WishlistContextDefaultValues,
            isInWishlist: () => true,
        };

        render(<WishlistButton id="1" hasText />, { wishlistProviderProps });

        expect(screen.getByText(/remove from wishlist/i)).toBeInTheDocument();
    });

    it('should not render if not logged', () => {
        (useSession as jest.Mock).mockReturnValue({
            data: null,
            status: 'unauthenticated'
        });

        const wishlistProviderProps = {
            ...WishlistContextDefaultValues,
            isInWishlist: () => true,
        };

        render(<WishlistButton id="1" hasText />, { wishlistProviderProps });

        expect(screen.queryByText(/remove from wishlist/i)).not.toBeInTheDocument();
    });

    it('should add to wishlist', async () => {
        const wishlistProviderProps = {
            ...WishlistContextDefaultValues,
            isInWishlist: () => false,
            addToWishlist: jest.fn(),
        };

        render(<WishlistButton id="1" hasText />, { wishlistProviderProps });

        await userEvent.click(screen.getByText(/add to wishlist/i));

        await waitFor(() => {
            expect(wishlistProviderProps.addToWishlist).toHaveBeenCalledWith('1');
        });
    });

    it('should remove from wishlist', async () => {
        const wishlistProviderProps = {
            ...WishlistContextDefaultValues,
            isInWishlist: () => true,
            removeFromWishlist: jest.fn(),
        };

        render(<WishlistButton id="1" hasText />, { wishlistProviderProps });

        await userEvent.click(screen.getByText(/remove from wishlist/i));
        await userEvent.click(screen.getByText(/remove from wishlist/i));
        expect(wishlistProviderProps.removeFromWishlist).toHaveBeenCalledWith('1');
    });
});