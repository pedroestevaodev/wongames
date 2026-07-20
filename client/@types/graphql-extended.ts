/* eslint-disable */
import { GameFragmentFragment } from "@/graphql/generated/graphql";

export type OrdersFragmentFragment = { __typename?: 'Order', createdAt?: any | null, card_brand?: string | null, card_last4?: string | null, id: string, games: Array<( { __typename?: 'Game' } & { ' $fragmentRefs'?: { 'GameFragmentFragment': GameFragmentFragment } } ) | null>}