'use client';

import React from 'react';
import * as S from './styles';
import {
	RiAccountCircleLine,
	RiListUnordered,
	RiLogoutCircleRLine
} from '@remixicon/react';
import { logout } from "@/actions/logout";

export type ProfileMenuProps = {
	activeLink?: '/profile/me' | '/profile/cards' | '/profile/orders' | string;
};

const ProfileMenu = ({ activeLink }: ProfileMenuProps) => {
	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<S.ProfileMenuContainer>
			<S.Menu
				href="/profile/me"
				$isActive={activeLink === '/profile/me'}
				title="My profile"
			>
				<RiAccountCircleLine size={24} />
				<S.MenuLabel>My profile</S.MenuLabel>
			</S.Menu>

			<S.Menu
				href="/profile/orders"
				$isActive={activeLink === '/profile/orders'}
				title="My orders"
			>
				<RiListUnordered size={24} />
				<S.MenuLabel>My orders</S.MenuLabel>
			</S.Menu>

			<S.MenuLogout
				type="button"
				title="Sign out"
				onClick={handleLogout}
			>
				<RiLogoutCircleRLine />
				<S.MenuLabel>Sign out</S.MenuLabel>
			</S.MenuLogout>
		</S.ProfileMenuContainer>
	);
};

export default ProfileMenu;
