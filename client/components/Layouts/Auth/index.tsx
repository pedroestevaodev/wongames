'use client';

import React from 'react';
import * as S from './styles';
import Logo from '@/components/Logo';
import Heading from '@/components/Heading';
import Link from 'next/link';
import Image from "next/image";

type AuthProps = {
	title: string;
	children: React.ReactNode;
};

const Auth = ({ title, children }: AuthProps) => {
	const currentYear = new Date().getFullYear();

	return (
		<S.AuthContainer>
			<S.BannerBlock>
				<Image 
					src={"/img/auth-bg.jpg"}
					className="object-cover"
					fill
					alt="Auth background"
				/>
				<S.BannerContent>
					<Link href="/">
						<Logo id="banner" />
					</Link>

					<div>
						<Heading size="huge">All your favorite games in one place</Heading>

						<S.Subtitle>
							<strong>WON</strong> is the best and most complete gaming
							platform.
						</S.Subtitle>
					</div>

					<S.Footer>Won Games {currentYear} © Todos os Direitos Reservados</S.Footer>
				</S.BannerContent>
			</S.BannerBlock>

			<S.Content>
				<S.ContentWrapper>
					<Link href="/">
						<Logo id="content" $color="black" $size="large" />
					</Link>
					<Heading color="black" lineColor="secondary" lineLeft>
						{title}
					</Heading>

					{children}
				</S.ContentWrapper>
			</S.Content>
		</S.AuthContainer>
	);
};

export default Auth;
