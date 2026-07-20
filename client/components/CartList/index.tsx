import React from 'react';
import * as S from './styles';
import Link from 'next/link';
import GameItem from '../GameItem';
import Button from '../Button';
import Empty from '../Empty';
import { useCart } from "@/hooks/useCart";
import Loader from "../Loader";

export type CartListProps = {
	hasButton?: boolean;
};

const CartList = ({ hasButton = false }: CartListProps) => {
	const { items, total, loading } = useCart();

	if (loading) {
		return (
			<S.Loading>
				<Loader />
			</S.Loading>
		);
	}

	return (
		<S.CartListContainer $isEmpty={!items.length} data-cy="cart-list">
			{items.length ? (
				<>
					<S.GamesList>
						{items.map((item) => (
							<GameItem key={item.title} {...item} />
						))}
					</S.GamesList>

					<S.Footer>
						{!hasButton && <S.FooterLabel>Total:</S.FooterLabel>}
						<S.Total>{total}</S.Total>

						{hasButton && (
							<Button as={Link} href="/cart">
								Buy it now
							</Button>
						)}
					</S.Footer>
				</>
			) : (
				<Empty
					title="Your cart is empty"
					description="Go back to the store and explore great games and offers."
					hasLink
				/>
			)}
		</S.CartListContainer>
	);
};

export default CartList;
