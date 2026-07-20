'use client';

import { useEffect } from 'react';
import * as S from './styles';
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import { GameCardProps } from '@/components/GameCard';
import { HighlightProps } from '@/components/Highlight';
import Base from '@/components/Layouts/Base';
import Container from '@/components/Container';
import ShowCase from '@/components/ShowCase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export type SuccessLayoutProps = {
	recommendedTitle: string;
	recommendedGames: GameCardProps[];
	recommendedHighlight: HighlightProps;
};

const Success = ({
	recommendedTitle,
	recommendedGames,
	recommendedHighlight
}: SuccessLayoutProps) => {
	const { clearCart } = useCart();

	useEffect(() => {
		clearCart();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Base>
			<Container>
				<S.SuccessLayoutContainer>
					<S.Heading>Your purchase was successful!</S.Heading>

					<S.CheckMark>
						<FontAwesomeIcon icon={faCircleCheck} size="4x" />
					</S.CheckMark>

					<S.Text>
						Wait for your payment details by email. Your game is now available
						for download inside your{' '}
						<Link href="/profile/orders">
							Orders List
						</Link>
						. Enjoy!
					</S.Text>
				</S.SuccessLayoutContainer>
			</Container>

			<ShowCase
				title={recommendedTitle}
				games={recommendedGames}
				highlight={recommendedHighlight}
			/>
		</Base>
	);
};

export default Success;