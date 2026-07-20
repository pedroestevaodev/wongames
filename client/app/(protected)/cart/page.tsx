import React from 'react';
import Cart from '@/components/Layouts/Cart';
import { getClient } from "@/lib/apolloClient";
import { GameFragmentFragment, GetRecommendedQuery, GetRecommendedQueryVariables, HighlightFragmentFragment } from "@/graphql/generated/graphql";
import { GET_RECOMMENDED } from "@/graphql/queries/recommended";
import { gamesMapper, highlightMapper } from "@/utils/mappers";
import { auth } from "@/services/auth";

const CartPage = async () => {
	const session = await auth();

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
		<Cart
			session={session!}
			recommendedTitle={recommended.section.title || "You may like these games"}
			recommendedGames={gamesMapper(recommended.section.games as GameFragmentFragment[])}
			recommendedHighlight={highlightMapper(recommended.section.highlight as HighlightFragmentFragment)}
		/>
	);
};

export default CartPage;
