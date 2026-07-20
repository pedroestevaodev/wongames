import { gql, QueryHookOptions } from '@apollo/client';
import { GameFragment } from './fragments/games';
import { GetGamesQuery, GetGamesQueryVariables } from "../generated/graphql";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

export const GET_GAMES = gql`
	query GetGames($limit: Int, $start: Int, $filters: GameFiltersInput, $sort: [String]) {
		games(
			pagination: { limit: $limit, start: $start } 
			filters: $filters
			sort: $sort
		) {
			...GameFragment
		}

		gamesMeta: games_connection(
			pagination: { limit: $limit, start: $start }
			filters: $filters
			sort: $sort
		) {
			pageInfo {
				page
				pageCount
				pageSize
				total
			}
		}
	}

	${GameFragment}
`;

export const GET_GAME_BY_SLUG = gql`
	query GetGameBySlug($slug: String!) {
		games(filters: { slug: { eq: $slug } }) {
			id: documentId
			name
			short_description
			description
			price
			rating
			release_date
			gallery {
				url
				alternativeText
			}
			cover {
				url
			}
			developers {
				name
			}
			publisher {
				name
			}
			categories {
				name
			}
			platforms {
				name
			}
		}
	}
`;

export const useQueryGames = (options?: QueryHookOptions<GetGamesQuery, GetGamesQueryVariables>) => {
	return useQuery<GetGamesQuery, GetGamesQueryVariables>(GET_GAMES, options);
};
