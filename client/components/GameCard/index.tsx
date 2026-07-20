import React from 'react';
import Image from 'next/image';
import * as S from './styles';
import Ribbon, { RibbonColorsProps, RibbonSizeProps } from '../Ribbon';
import { formatPrice } from '@/utils/formats';
import CartButton from "../CartButton";
import WishlistButton from "../WishlistButton";

export type GameCardProps = {
	id: string;
	slug: string;
	title: string;
	developer: string;
	img: string;
	price: number;
	promotionalPrice?: number;
	ribbon?: React.ReactNode;
	ribbonColor?: RibbonColorsProps;
	ribbonSize?: RibbonSizeProps;
};

const GameCard = ({
	id,
	slug,
	title,
	developer,
	img,
	price,
	promotionalPrice,
	ribbon,
	ribbonColor = 'primary',
	ribbonSize = 'small',
}: GameCardProps) => {
	return (
		<S.GameCardContainer
			href={`/game/${slug}`}
			data-cy="game-card"
		>
			{!!ribbon && (
				<Ribbon color={ribbonColor} size={ribbonSize}>
					{ribbon}
				</Ribbon>
			)}
			<S.ImageBox className="rounded-t-[6px] rounded-b-[0px]">
				<Image src={`${img}`} fill alt={title} priority />
			</S.ImageBox>
			<S.Content>
				<S.Info>
					<S.Title>{title}</S.Title>
					<S.Developer>{developer}</S.Developer>
				</S.Info>
				<S.FavButton>
					<WishlistButton id={id} />
				</S.FavButton>
				<S.BuyBox>
					{!!promotionalPrice && (
						<S.Price $isPromotional>{formatPrice(price)}</S.Price>
					)}
					<S.Price>{formatPrice(promotionalPrice || price)}</S.Price>
					<CartButton id={id} />
				</S.BuyBox>
			</S.Content>
		</S.GameCardContainer>
	);
};

export default GameCard;
