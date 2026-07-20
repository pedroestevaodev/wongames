import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import { GameFragment } from "./fragments/games";
import { GetWishlistQuery, GetWishlistQueryVariables } from "../generated/graphql";

export const GET_WISHLIST = gql`
    query GetWishlist($documentId: ID!) {
        wishlists(filters: { user: { documentId: { eq: $documentId } } }) {
            id: documentId
            games {
                ...GameFragment
            }  
        }
    }
    
    ${GameFragment}
`;

export const useQueryWishlist = (options?: QueryHookOptions<GetWishlistQuery, GetWishlistQueryVariables>) => {
    return useQuery<GetWishlistQuery, GetWishlistQueryVariables>(GET_WISHLIST, options);
};