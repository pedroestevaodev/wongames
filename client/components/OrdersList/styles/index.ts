'use client';

import styled from 'styled-components';
import * as GameItemStyles from '@/components/GameItem/styles';

export const OrdersListContainer = styled.div`
	${GameItemStyles.GameItemContainer} {
		&:last-child {
			border-bottom: 0;
		}
	}
`;
