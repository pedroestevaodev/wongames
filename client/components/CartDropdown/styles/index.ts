'use client';

import styled from 'styled-components';
import * as DropdownStyle from '@/components/Dropdown/styles';
import { CartListContainer as CartListStyle } from '@/components/CartList/styles';

export const CartDropdownContainer = styled.div`
	${DropdownStyle.Title} {
		padding: 0rem;
	}

	${CartListStyle} {
		border-radius: 6px;
		overflow: hidden;
		width: 56rem;
	}
`;
