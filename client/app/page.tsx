import React from 'react';
import Home from '@/components/Layouts/Home';
import { GET_HOME } from '@/graphql/queries/home';
import { getClient } from '@/lib/apolloClient';
import {
	BannerFragmentFragment,
	GameFragmentFragment,
	GetHomeQuery,
	GetHomeQueryVariables,
	HighlightFragmentFragment
} from '@/graphql/generated/graphql';
import {
	bannerMapper,
	gamesMapper,
	highlightMapper
} from '@/utils/mappers';

const Index = async () => {
	const {
		data: { banners, newGames, upcomingGames, freeGames, sections }
	} = await getClient().query<GetHomeQuery, GetHomeQueryVariables>({
		query: GET_HOME,
		variables: { date: new Date().toISOString().slice(0, 10) },
		context: {
			fetchOptions: {
				next: { revalidate: 10 }
			}
		}
	});

	return (
		<Home
			banners={bannerMapper(banners as BannerFragmentFragment[])}
			newGamesTitle={sections?.newGames?.title || ''}
			newGames={gamesMapper(newGames as GameFragmentFragment[])}
			mostPopularGamesTitle={
				sections?.popularGames?.title || ''
			}
			mostPopularHighlight={highlightMapper(
				sections?.popularGames?.highlight as HighlightFragmentFragment
			)}
			mostPopularGames={gamesMapper(
				sections?.popularGames?.games as GameFragmentFragment[]
			)}
			upcomingGamesTitle={
				sections?.upcomingGames?.title || ''
			}
			upcomingHighlight={highlightMapper(
				sections?.upcomingGames?.highlight as HighlightFragmentFragment
			)}
			upcomingGames={gamesMapper(upcomingGames as GameFragmentFragment[])}
			freeGamesTitle={sections?.freeGames?.title || ''}
			freeHighlight={highlightMapper(
				sections?.freeGames?.highlight as HighlightFragmentFragment
			)}
			freeGames={gamesMapper(freeGames as GameFragmentFragment[])}
		/>
	);
};

export default Index;
