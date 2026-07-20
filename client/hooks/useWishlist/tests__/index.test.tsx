import { act, renderHook, waitFor } from '@/utils/testsHelper';
import { MockedProvider } from '@apollo/client/testing';
import { expect } from '@jest/globals';
import { useSession } from "next-auth/react";
import { useWishlist, WishlistProvider } from "..";
import { createWishlistMock, removeWishlistMock, updateWishlistMock, wishlistItems, wishlistMock } from "../mocks";

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
}));

const session = {
    user: { email: 'lorem@ipsum.com' },
    expires: '9999-12-31T23:59:59.999Z',
};

(useSession as jest.Mock).mockReturnValue({
    data: session,
    status: 'authenticated',
});

describe('useWishlist', () => {
    it('should return wishlist items', async () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <MockedProvider mocks={[wishlistMock]}>
                <WishlistProvider>{children}</WishlistProvider>
            </MockedProvider>
        );

        const { result } = renderHook(() => useWishlist(), {
            wrapper
        });

        // it starts loading the data
        expect(result.current.loading).toBe(true);

        expect(result.current.items).toStrictEqual([
            wishlistItems[0],
            wishlistItems[1]
        ]);
    });

    it('should check if the game is in the wishlist', async () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <MockedProvider mocks={[wishlistMock]}>
                <WishlistProvider>{children}</WishlistProvider>
            </MockedProvider>
        );

        const { result } = renderHook(() => useWishlist(), {
            wrapper
        });

        expect(result.current.isInWishlist('1')).toBe(true);
        expect(result.current.isInWishlist('2')).toBe(true);
        expect(result.current.isInWishlist('3')).toBe(false);
    });

    it('should add item in wishlist creating a new list', async () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <MockedProvider mocks={[createWishlistMock]}>
                <WishlistProvider>{children}</WishlistProvider>
            </MockedProvider>
        );

        const { result } = renderHook(() => useWishlist(), {
            wrapper
        });

        act(() => {
            result.current.addToWishlist('3')
        });

        expect(result.current.items).toStrictEqual([wishlistItems[2]]);
    });

    it('should add item in wishlist updating the current list', async () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <MockedProvider mocks={[wishlistMock, updateWishlistMock]}>
                <WishlistProvider>{children}</WishlistProvider>
            </MockedProvider>
        );

        const { result } = renderHook(() => useWishlist(), {
            wrapper
        });

        act(() => {
            result.current.addToWishlist('3')
        });

        await waitFor(() => {
            expect(result.current.items).toStrictEqual(wishlistItems)
        });
    })

    it('should remove item from wishlist', async () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <MockedProvider mocks={[wishlistMock, removeWishlistMock]}>
                <WishlistProvider>{children}</WishlistProvider>
            </MockedProvider>
        );

        const { result } = renderHook(() => useWishlist(), {
            wrapper
        });

        act(() => {
            result.current.removeFromWishlist('1')
        });

        await waitFor(() => {
            expect(result.current.items).toStrictEqual([wishlistItems[1]])
        });
    });
});