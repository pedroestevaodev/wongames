import React from 'react';
import Wishlist from '@/components/Layouts/Wishlist';
import { getClient } from '@/lib/apolloClient';
import {
	GameFragmentFragment,
	GetRecommendedQuery,
	GetRecommendedQueryVariables,
	HighlightFragmentFragment
} from '@/graphql/generated/graphql';
import { GET_RECOMMENDED } from '@/graphql/queries/recommended';
import { gamesMapper, highlightMapper } from "@/utils/mappers";

const WishlistPage = async () => {
	const {
		data: { recommended }
	} = await getClient().query<GetRecommendedQuery, GetRecommendedQueryVariables>({
		query: GET_RECOMMENDED,
		context: {
			fetchOptions: {
				next: { revalidate: 60 }
			}
		}
	});

	if (!recommended) return null;

	return (
		<Wishlist
			recommendedTitle={recommended.section.title || "You may like these games"}
			recommendedGames={gamesMapper(recommended.section.games as GameFragmentFragment[])}
			recommendedHighlight={highlightMapper(recommended.section.highlight as HighlightFragmentFragment)}
		/>
	);
};

export default WishlistPage;
