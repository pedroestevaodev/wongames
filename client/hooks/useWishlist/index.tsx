'use client';

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { GameCardProps } from "@/components/GameCard";
import { useSession } from "next-auth/react";
import { GameFragmentFragment, MutationCreateWishlistMutation, MutationUpdateWishlistMutation } from "@/graphql/generated/graphql";
import { useApolloClient, useMutation } from "@apollo/client";
import { MUTATION_CREATE_WISHLIST, MUTATION_UPDATE_WISHLIST } from "@/graphql/mutations/wishlist";
import { useQueryWishlist } from "@/graphql/queries/wishlist";
import { GameFragment } from "@/graphql/queries/fragments/games";
import { gamesMapper } from "@/utils/mappers";

export type WishlistContextData = {
    items: GameCardProps[];
    isInWishlist: (id: string) => boolean;
    addToWishlist: (id: string) => void;
    removeFromWishlist: (id: string) => void;
    loading: boolean;
};

export const WishlistContextDefaultValues = {
    items: [],
    isInWishlist: () => false,
    addToWishlist: () => null,
    removeFromWishlist: () => null,
    loading: false,
};

export const WishlistContext = createContext<WishlistContextData>(
    WishlistContextDefaultValues
);

export type WishlistProviderProps = {
    children: React.ReactNode;
};

const WishlistProvider = ({ children }: WishlistProviderProps) => {
    const { data: session } = useSession();
    const client = useApolloClient();

    const [wishlistId, setWishlistId] = useState<string | null>(null);
    const [wishlistItems, setWishlistItems] = useState<GameFragmentFragment[]>([]);

    const [createList, { loading: loadingCreate }] = useMutation(MUTATION_CREATE_WISHLIST, {
        context: { session },
        onCompleted: (data: MutationCreateWishlistMutation) => {
            console.log('create', data);
            setWishlistId(data.createWishlist?.id ?? null);
            setWishlistItems((data.createWishlist?.games || []).filter((game): game is GameFragmentFragment => game !== null));
        },
    });

    const [updateList, { loading: loadingUpdate }] = useMutation(MUTATION_UPDATE_WISHLIST, {
        context: { session },
        onCompleted: (data: MutationUpdateWishlistMutation) => {
            console.log('update', data);
            setWishlistItems((data.updateWishlist?.games || []).filter((game): game is GameFragmentFragment => game !== null));
        },
    });

    const options = {
        skip: !session?.user.id,
        context: { session },
        variables: {
            documentId: session?.user.id as string,
        },
    };

    const { data, loading: loadingQuery } = useQueryWishlist(options);

    useEffect(() => {
        if (data?.wishlists?.length) {
            const [wishlist] = data.wishlists;
            console.log('wishlist useEffect',wishlist);
            setWishlistItems(wishlist!.games.filter((game): game is GameFragmentFragment => game !== null));
            setWishlistId(wishlist!.id);
        }
    }, [data?.wishlists]);

    const wishlistIds = useMemo(() => wishlistItems.map((game) => game.id), [wishlistItems]);

    useEffect(() => {
        console.log('wishlistIds',wishlistIds);
    }, [wishlistIds]);

    const isInWishlist = (id: string) => wishlistItems.some((game) => game.id === id);

    const optimisticGameResponse = (id: string) => {
        return wishlistItems.find(game => game.id === id) || client.readFragment({
            id: `Game:${id}`,
            fragment: GameFragment,
        }) || {
            __typename: 'Game',
            id,
            name: '',
            slug: '',
            cover: { __typename: 'UploadFile', url: '' },
            developers: [{ __typename: 'Developer', name: '' }],
            price: '',
        };
    };

    const addToWishlist = (id: string) => {
        const updatedGames = [...wishlistItems, optimisticGameResponse(id)];
        const updatedGamedIds = [...wishlistItems.map((item) => item.id), id];

        const variables = {
            ...wishlistId && { documentId: wishlistId },
            data: { user: session?.user?.id, games: updatedGamedIds },
        };

        return wishlistId
            ? updateList({ variables, optimisticResponse: { updateWishlist: { id: wishlistId, games: updatedGames, __typename: 'Wishlist' } } })
            : createList({ variables, optimisticResponse: { createWishlist: { id: String(Math.round(Math.random() * -1000000)), games: [optimisticGameResponse(id)], __typename: 'Wishlist' } } });
    };


    const removeFromWishlist = (id: string) => {
        return updateList({
            variables: {
                documentId: wishlistId,
                data: {
                    user: session?.user.id,
                    games: [
                        ...wishlistIds.filter((gameId: string) => gameId !== id),
                    ],
                },
            },
            optimisticResponse: {
                updateWishlist: {
                    id: wishlistId,
                    games: wishlistItems.filter(({ id: gameId }) => gameId !== id),
                    __typename: 'Wishlist',
                },
            },
        });
    };

    return (
        <WishlistContext.Provider
            value={{
                items: gamesMapper(wishlistItems),
                isInWishlist,
                addToWishlist,
                removeFromWishlist,
                loading: loadingQuery || loadingCreate || loadingUpdate
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

// const useWishlist = () => useContext(WishlistContext);

const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
};

export { WishlistProvider, useWishlist };