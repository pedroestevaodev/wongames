import React from 'react';
import * as S from './styles';
import GameItem, { GameItemProps, PaymentInfoProps } from '../GameItem';
import Heading from '../Heading';
import Empty from '../Empty';

export type OrderProps = {
	id: string;
	paymentInfo: PaymentInfoProps;
	games: GameItemProps[];
};

export type OrdersListProps = {
	items?: OrderProps[];
};

const OrdersList = ({ items = [] }: OrdersListProps) => {
	return (
		<S.OrdersListContainer>
			<Heading lineBottom lineColor="primary" color="black" size="small">
				My orders
			</Heading>

			{items.length ? (
				items.map((order) => {
					return order.games.map((game) => (
						<GameItem 
							key={`${order.id}-${game.id}`}
							{...game}
							paymentInfo={order.paymentInfo}
						/>
					))
				})
			) : (
				<Empty
					title="You have no orders yet"
					description="Go back to the store and explore great games and offers"
					hasLink
				/>
			)}
		</S.OrdersListContainer>
	);
};

export default OrdersList;
