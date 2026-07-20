import React from 'react';
import { notFound } from 'next/navigation';
import Game from '@/components/Layouts/Game';
import {
	Enum_Game_Rating,
	GameFragmentFragment,
	GetGameBySlugQuery,
	GetGameBySlugQueryVariables,
	GetRecommendedQuery,
	GetRecommendedQueryVariables,
	GetUpcomingQuery,
	GetUpcomingQueryVariables,
	HighlightFragmentFragment
} from '@/graphql/generated/graphql';
import { getClient } from '@/lib/apolloClient';
import { GET_GAME_BY_SLUG } from '@/graphql/queries/games';
import { PlatformProps, RatingProps } from '@/components/GameDetails';
import { GalleryImageProps } from '@/components/Gallery';
import { GET_RECOMMENDED } from "@/graphql/queries/recommended";
import { gamesMapper, highlightMapper } from "@/utils/mappers";
import { GET_UPCOMING } from "@/graphql/queries/upcoming";

const Index = async ({ params }: { params: { slug: string } }) => {
	const { slug } = params;

	const { data, error } = await getClient().query<GetGameBySlugQuery, GetGameBySlugQueryVariables>({
		query: GET_GAME_BY_SLUG,
		variables: { slug: slug },
		context: {
			fetchOptions: {
				next: { revalidate: 60 }
			},
		},
	});

	if (!data.games.length) return notFound();

	if (error) return notFound();

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

	const {
		data: { upcomingGames, showcase }
	} = await getClient().query<GetUpcomingQuery, GetUpcomingQueryVariables>({
		query: GET_UPCOMING,
		variables: { date: new Date().toISOString().slice(0, 10) },
		context: {
			fetchOptions: {
				next: { revalidate: 10 }
			}
		}
	});

	return (
		<Game
			cover={`${data.games[0]?.cover?.url}` || ''}
			gameInfo={{
				id: data.games[0]?.id || '',
				title: data.games[0]?.name || '',
				price: data.games[0]?.price || 0,
				description: data.games[0]?.short_description || ''
			}}
			gallery={
				(data.games[0]?.gallery.map((image) => ({
					src: `${image?.url}`,
					label: image?.alternativeText
				})) as unknown as GalleryImageProps[]) ?? []
			}
			description={data.games[0]?.description || ''}
			details={{
				developer: data.games[0]?.developers[0]?.name || '',
				releaseDate: data.games[0]?.release_date || '',
				platforms:
					(data.games[0]?.platforms.map(
						(platform) => platform?.name
					) as PlatformProps[]) ?? [],
				publisher: data.games[0]?.publisher?.name || '',
				rating: (data.games[0]?.rating as RatingProps) || Enum_Game_Rating.Br18,
				genres:
					(data.games[0]?.categories.map(
						(category) => category?.name
					) as string[]) ?? []
			}}
			upcomingTitle={showcase?.upcomingGames?.title || "Upcoming games"}
			upcomingGames={gamesMapper(upcomingGames as GameFragmentFragment[])}
			upcomingHighlight={highlightMapper(showcase?.upcomingGames?.highlight as HighlightFragmentFragment)}
			recommendedTitle={recommended?.section.title || "You may like these games"}
			recommendedGames={gamesMapper(recommended?.section.games as GameFragmentFragment[])}
		/>
	);
};

export default Index;
