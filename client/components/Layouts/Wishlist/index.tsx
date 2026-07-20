'use client';

import React from 'react';
import * as S from './styles';
import Base from '../Base';
import Heading from '@/components/Heading';
import Container from '@/components/Container';
import GameCard, { GameCardProps } from '@/components/GameCard';
import { HighlightProps } from '@/components/Highlight';
import ShowCase from '@/components/ShowCase';
import Grid from '@/components/Grid';
import Divider from '@/components/Divider';
import Empty from '@/components/Empty';
import { useWishlist } from "@/hooks/useWishlist";
import Loader from "@/components/Loader";

export type WishlistLayoutProps = {
	recommendedTitle: string;
	recommendedGames: GameCardProps[];
	recommendedHighlight: HighlightProps;
};

const Wishlist = ({
	recommendedTitle,
	recommendedGames,
	recommendedHighlight
}: WishlistLayoutProps) => {
	const { items, loading } = useWishlist();

	return (
		<Base>
			<Container>
				<Heading lineLeft lineColor="secondary">
					Wishlist
				</Heading>

				{loading ? (
					<S.Loading>
						<Loader />
					</S.Loading>
				) : items.length >= 1 ? (
					<Grid>
						{items?.map((game, index) => (
							<GameCard key={`wishlist-${index}`} {...game} />
						))}
					</Grid>
				) : (
					<Empty
						title="Your wishlist is empty"
						description="Games added to your wishlist will appear here"
						hasLink
					/>
				)}

				<Divider />
			</Container>

			<ShowCase
				title={recommendedTitle}
				games={recommendedGames}
				highlight={recommendedHighlight}
			/>
		</Base>
	);
};

export default Wishlist;
