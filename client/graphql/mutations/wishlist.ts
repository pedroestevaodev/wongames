import { gql } from "@apollo/client";
import { GameFragment } from "../queries/fragments/games";

export const MUTATION_CREATE_WISHLIST = gql`
    mutation MutationCreateWishlist($data: WishlistInput!) {
        createWishlist(data: $data) {
            id: documentId
            games {
                ...GameFragment
            }
        }
    }

    ${GameFragment}
`;

export const MUTATION_UPDATE_WISHLIST = gql`
    mutation MutationUpdateWishlist($documentId: ID!, $data: WishlistInput!) {
        updateWishlist(documentId: $documentId, data: $data) {
            id: documentId
            games {
                ...GameFragment
            }
        }
    }

    ${GameFragment}
`;