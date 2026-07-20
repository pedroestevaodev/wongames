import { gql } from '@apollo/client';
import { BannerFragment } from './fragments/banner';
import { GameFragment } from './fragments/games';
import { HighlightFragment } from './fragments/highlight';

export const GET_HOME = gql`
	query GetHome($date: Date!) {
		banners {
			...BannerFragment
		}

		newGames: games(
			filters: { release_date: { lte: $date } }
			sort: "release_date:desc"
			pagination: { limit: 8 }
		) {
			...GameFragment
		}

		upcomingGames: games(
			filters: { release_date: { gt: $date } }
			sort: "release_date:asc"
			pagination: { limit: 8 }
		) {
			...GameFragment
		}

		freeGames: games(
			filters: { price: { eq: 0 } }
			sort: "release_date:desc"
			pagination: { limit: 8 }
		) {
			...GameFragment
		}

		sections: home {
			newGames {
				title
				highlight {
					...HighlightFragment
				}
			}

			popularGames {
				title
				highlight {
					...HighlightFragment
				}
				games(pagination: { limit: 8 }) {
					...GameFragment
				}
			}

			upcomingGames {
				title
				highlight {
					...HighlightFragment
				}
			}

			freeGames {
				title
				highlight {
					...HighlightFragment
				}
			}
		}
	}

	${BannerFragment}
	${GameFragment}
	${HighlightFragment}
`;
