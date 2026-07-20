import { ItemProps } from "@/components/ExploreSidebar";
import exploreSidebarMock from '@/components/ExploreSidebar/mocks/mock';
import { GameCardProps } from "@/components/GameCard";
import gameCardSliderItems from '@/components/GameCardSlider/mocks/mock';
import { GET_GAMES } from "@/graphql/queries/games";
import { InMemoryCache } from "@apollo/client";
import { concatPagination } from "@apollo/client/utilities";

type GamesLayoutProps = {
	games: GameCardProps[];
	filterItems: ItemProps[];
};

export const gamePageMock: GamesLayoutProps = {
	games: gameCardSliderItems,
	filterItems: exploreSidebarMock
};

export const mockQueryGames = {
	request: {
		query: GET_GAMES,
		variables: { limit: 15, where: {} }
	},
	result: {
		data: {
			games: [
				{
					id: '1',
					name: 'Sample Game',
					slug: 'sample-game',
					price: 518.39,
					developers: [{ name: 'sample developer' }],
					cover: {
						url: 'sample-game.jpg'
					},
					__typename: 'Game'
				}
			],
			gamesMeta: {
				pageInfo: {
					page: 1,
					pageCount: 1,
					pageSize: 1,
					total: 1,
					__typename: "Pagination",
				},
				__typename: 'GameEntityResponseCollection'
			}
		}
	}
};

export const mockGames = [
	{
		name: 'Sample Game',
		slug: 'sample-game',
		price: 518.39,
		developers: [{ name: 'sample developer' }],
		cover: {
			url: 'sample-game.jpg'
		},
		__typename: 'Game'
	}
];

export const noGamesMock = {
	request: {
		query: GET_GAMES,
		variables: { limit: 15, where: {} }
	},
	result: {
		data: {
			games: [],
			gamesConnection: {
				values: [],
				__typename: 'GameConnection'
			}
		}
	}
};;

export const fetchMoreMock = {
	request: {
		query: GET_GAMES,
		variables: { limit: 15, where: {}, start: 1 }
	},
	result: {
		data: {
			games: [
				{
					id: '2',
					name: 'Fetch More Game',
					slug: 'fetch-more',
					price: 518.39,
					developers: [{ name: 'sample developer' }],
					cover: {
						url: 'sample-game.jpg'
					},
					__typename: 'Game'
				}
			],
			gamesConnection: {
				values: [{ id: '1' }, { id: '2' }],
				__typename: 'GameConnection'
			}
		}
	}
};

export const apolloCache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				games: concatPagination(['where', 'sort'])
			}
		},
		Wishlist: {
			fields: {
				games: {
					merge(_, incoming) {
						return incoming
					}
				}
			}
		}
	}
})