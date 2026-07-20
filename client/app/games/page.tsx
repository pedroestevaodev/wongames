import React from 'react';
import Games from '@/components/Layouts/Games';
import { getClient } from "@/lib/apolloClient";
import { getFilterItems } from "@/utils/filters/fields";
import { GameFragmentFragment, GetGamesQuery, GetGamesQueryVariables } from "@/graphql/generated/graphql";
import { GET_GAMES } from "@/graphql/queries/games";

export const dynamic = "force-static";
export const revalidate = 60;

const GamesPage = async () => {
	const client = getClient();
	const filterItems = await getFilterItems();

	const { data } = await client.query<GetGamesQuery, GetGamesQueryVariables>({
		query: GET_GAMES,
		variables: { limit: 15, start: 0, sort: "name:asc" },
	});

	return (
		<Games
			filterItems={filterItems}
			initialData={data.games as GameFragmentFragment[]}
		/>
	);
};

export default GamesPage;
