import { gql } from '@apollo/client';
import { GameFragment } from "./fragments/games";

export const GET_ORDERS = gql`
    query GetOrders($identifier: ID!) {
        orders(filters: { user: { documentId: { eq: $identifier } } }) {
            id: documentId
            createdAt
            card_brand
            card_last4
            games {
                ...GameFragment
            }
        }
    }

    ${GameFragment}
`;
