import React from 'react';
import * as S from './styles';
import Dropdown from '../Dropdown';
import CartIcon from '../CartIcon';
import CartList from '../CartList';

export type CartDropdownProps = {
	className?: string;
};

const CartDropdown = ({ className = "" }: CartDropdownProps) => {
	return (
		<S.CartDropdownContainer className={className}>
			<Dropdown title={<CartIcon />}>
				<CartList hasButton />
			</Dropdown>
		</S.CartDropdownContainer>
	);
};

export default CartDropdown;
