'use client';

import React from 'react';
import * as S from './styles';
import { usePathname } from 'next/navigation';
import Base from '../Base';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import ProfileMenu from '@/components/ProfileMenu';

export type ProfileLayoutProps = {
	children: React.ReactNode;
};

const Profile = ({ children }: ProfileLayoutProps) => {
	const pathname = usePathname();

	return (
		<Base>
			<Container>
				<Heading lineLeft lineColor="secondary">
					My profile
				</Heading>

				<S.Main>
					<ProfileMenu activeLink={pathname} />
					<S.Content>{children}</S.Content>
				</S.Main>
			</Container>
		</Base>
	);
};

export default Profile;
