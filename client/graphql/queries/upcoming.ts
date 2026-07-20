import { gql } from '@apollo/client';
import { GameFragment } from './fragments/games';
import { HighlightFragment } from './fragments/highlight';

export const GET_UPCOMING = gql`
	query GetUpcoming($date: Date!) {
		upcomingGames: games(
			filters: { release_date: { gt: $date } }
			sort: "release_date:asc"
			pagination: { limit: 8 }
		) {
			...GameFragment
		}

		showcase: home {
			upcomingGames {
				title
				highlight {
					...HighlightFragment
				}
			}
		}
	}

	${GameFragment}
	${HighlightFragment}
`;
