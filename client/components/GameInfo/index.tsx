import React from 'react';
import * as S from './styles';
import Heading from '../Heading';
import Ribbon from '../Ribbon';
import { formatPrice } from '@/utils/formats';
import CartButton from "../CartButton";
import WishlistButton from "../WishlistButton";

export type GameInfoProps = {
	id: string;
	title: string;
	description: string;
	price: number;
};

const GameInfo = ({ id, title, description, price }: GameInfoProps) => {
	return (
		<S.GameInfoContainer data-cy="game-info">
			<Heading color="black" lineBottom>
				{title}
			</Heading>

			<Ribbon color="secondary">{formatPrice(price)}</Ribbon>

			<S.Description>{description}</S.Description>

			<S.ButtonsWrapper>
				<CartButton id={id} size="large" hasText />
				<WishlistButton id={id} hasText size="large" />
			</S.ButtonsWrapper>
		</S.GameInfoContainer>
	);
};

export default GameInfo;
