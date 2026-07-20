'use client';

import React from 'react';
import * as S from './styles';
import Container from '@/components/Container';
import Menu from '@/components/Menu';
import Footer from '@/components/Footer';
import { ChildrenProps } from "@/@types/nextjs";
import { useSession } from "next-auth/react";

const Base = ({ children }: ChildrenProps) => {
	const { data: session } = useSession();

	return (
		<S.BaseContainer>
			<Container>
				<Menu username={session?.user?.name} />
			</Container>

			<S.Content>{children}</S.Content>

			<S.SectionFooter>
				<Container>
					<Footer />
				</Container>
			</S.SectionFooter>
		</S.BaseContainer>
	);
};

export default Base;
