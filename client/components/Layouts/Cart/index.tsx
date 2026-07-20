'use client';

import React from 'react';
import * as S from './styles';
import { GameCardProps } from '@/components/GameCard';
import { HighlightProps } from '@/components/Highlight';
import CartList, { CartListProps } from '@/components/CartList';
import Base from '../Base';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import Divider from '@/components/Divider';
import ShowCase from '@/components/ShowCase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import PaymentForm from '@/components/PaymentForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Session } from 'next-auth';

export type CartLayoutProps = {
	session: Session;
	recommendedTitle: string;
	recommendedGames: GameCardProps[];
	recommendedHighlight: HighlightProps;
} & CartListProps;

const stripe = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

const Cart = ({
	session,
	recommendedTitle,
	recommendedGames,
	recommendedHighlight,
}: CartLayoutProps) => {
	return (
		<Base>
			<Container>
				<Heading lineLeft lineColor="secondary">
					My cart
				</Heading>

				<S.Content>
					<CartList />

					<Elements stripe={stripe}>
						<PaymentForm session={session} />
					</Elements>
				</S.Content>

				<S.Text>
					<FontAwesomeIcon icon={faCircleInfo} width={18} height={18} /> Your purchase is protected by a secure connection
					from the WON platform. By purchasing from our store you agree and
					agree to our <a href="#">terms of use.</a> After making the purchase
					you are entitled to a refund within a maximum of 30 days, without any
					additional cost, as long as the download of the purchased game has not
					occurred after your purchase.
				</S.Text>
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

export default Cart;
