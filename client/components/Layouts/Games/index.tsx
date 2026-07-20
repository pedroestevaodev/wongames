'use client';

import React, { useState, useTransition } from 'react';
import * as S from './styles';
import Base from '../Base';
import GameCard from '@/components/GameCard';
import ExploreSidebar, { ItemProps } from '@/components/ExploreSidebar';
import Grid from '@/components/Grid';
import { RiArrowDownSLine } from '@remixicon/react';
import { GameFragmentFragment } from "@/graphql/generated/graphql";
import { useQueryGames } from "@/graphql/queries/games";
import { gamesMapper } from "@/utils/mappers";
import SkeletonContainer from "@/components/Skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { parseQueryStringToFilter, parseQueryStringToObjFilter } from "@/utils/filters";
import { ParsedUrlQueryInput } from "querystring";
import Empty from "@/components/Empty";

export type GamesLayoutProps = {
	filterItems: ItemProps[];
	initialData: GameFragmentFragment[];
};

export type FilterValue = {
	[filter: string]: string | string[] | number;
};

export type FilterObject = {
	[name: string]: {
		[value: string]: FilterValue;
	} | FilterValue | string | string[] | number;
};

const Games = ({
	filterItems,
	initialData,
}: GamesLayoutProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const queryString = Object.fromEntries(searchParams.entries());

	const [isPending, startTransition] = useTransition();
	const [games, setGames] = useState<GameFragmentFragment[]>(initialData);

	const filters = parseQueryStringToObjFilter(queryString, filterItems);

	const { data, loading, fetchMore } = useQueryGames({
		notifyOnNetworkStatusChange: true,
		variables: {
			limit: 15,
			start: 0,
			filters,
			sort: queryString.sort || "name:asc",
		},
		onCompleted: (newData) => {
			if (newData?.games) setGames(newData.games as GameFragmentFragment[]);
		},
	});

	const hasMoreGames = (data?.games?.length ?? 0) < (data?.gamesMeta?.pageInfo.total ?? 0);

	const handleFilter = (items: ParsedUrlQueryInput) => {
		const queryString = Object.entries(items).map(([key, value]) => `${key}=${encodeURIComponent(value?.toString() ?? '')}`).join('&');
		router.push(`/games?${queryString}`);
	};

	const handleShowMore = () => {
		startTransition(() => {
			fetchMore({
				variables: {
					limit: 15,
					start: data?.games.length ?? 0 + 1,
				},
			});
		});
	};

	return (
		<Base>
			<S.Main>
				<ExploreSidebar
					initialValues={parseQueryStringToFilter({ queryString, filterItems })}
					items={filterItems}
					onFilter={handleFilter}
				/>

				<section>
					{games.length ? (
						<>
							<Grid>
								{gamesMapper(games).map((game) => (
									<GameCard
										key={game.slug}
										id={game.id}
										title={game.title}
										slug={game.slug}
										developer={game.developer || 'Desconhecido'}
										img={game.img}
										price={game.price}
									/>
								))}
								{loading ? (
									<SkeletonContainer numberOfElements={3}>
										<div className="relative flex flex-col w-full h-full rounded-[6px] overflow-hidden bg-white">
											<div className="h-[14rem] min-h-[14rem] overflow-hidden rounded-t-[6px] rounded-b-[0px] w-full">
												<div className="w-full h-full bg-[rgb(209,213,219)] animate-pulse" />
											</div>
											<div className="relative flex flex-col justify-between h-full p-xsmall gap-[8px]">
												<div className="flex items-center flex-col justify-between gap-[5px] w-full">
													<div className="flex items-center gap-2 w-full">
														<div className="w-full h-[24px] bg-[rgb(209,213,219)] rounded-[6px] animate-pulse" />
														<div className="w-[28px] h-[24px] bg-[rgb(209,213,219)] rounded-[50%] animate-pulse" />
													</div>
													<div className="w-full h-[21px] bg-[rgb(209,213,219)] rounded-[6px] animate-pulse" />
												</div>
												<div className="flex items-center justify-end gap-2 w-full">
													<div className="w-[70px] h-[30px] bg-[rgb(209,213,219)] rounded-[6px] animate-pulse" />
													<div className="w-[30px] h-[30px] bg-[rgb(209,213,219)] rounded-[6px] animate-pulse" />
												</div>
											</div>
										</div>
									</SkeletonContainer>
								) : null}
							</Grid>

							{hasMoreGames && (
								<S.ShowMore>
									{loading ? (
										<S.ShowMoreLoading
											src={`/img/dots.svg`}
											alt="Loading more games..."
										/>
									) : (
										<S.ShowMoreButton
											type="button"
											$isPending={isPending}
											onClick={handleShowMore}
										>
											<p>Show More</p>
											<RiArrowDownSLine size={35} />
										</S.ShowMoreButton>
									)}
								</S.ShowMore>
							)}
						</>
					) : (
						<Empty
							title=":("
							description="We didn't find any games with this filter"
							hasLink
						/>
					)}
				</section>
			</S.Main>
		</Base>
	);
};

export default Games;
