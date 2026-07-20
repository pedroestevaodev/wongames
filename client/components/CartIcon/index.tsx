import React from 'react';
import * as S from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useCart } from "@/hooks/useCart";

const CartIcon = () => {
	const { quantity } = useCart();

	return (
		<S.CartIconContainer type="button">
			{quantity > 0 && <S.Badge aria-label="Cart Items">{quantity}</S.Badge>}
			<FontAwesomeIcon icon={faCartShopping} className="!size-[18px]" aria-label="Shopping Cart" />
		</S.CartIconContainer>
	);
};

export default CartIcon;
