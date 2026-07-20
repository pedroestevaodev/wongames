'use client';

import React, { useState } from 'react';
import * as S from './styles';
import Logo from '../Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Button from '../Button';
import CartDropdown from '../CartDropdown';
import UserDropdown from '../UserDropdown';

export type MenuProps = {
	username?: string | null;
	loading?: boolean;
};

const Menu = ({ username, loading }: MenuProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<S.MenuContainer $isOpen={isOpen}>
			<S.IconWrapper className="flex md:!hidden" aria-label="Open Menu" onClick={() => setIsOpen(!isOpen)}>
				<FontAwesomeIcon icon={faBars} />
			</S.IconWrapper>

			<S.LogoWrapper>
				<Link href="/">
					<Logo $hideOnMobile />
				</Link>
			</S.LogoWrapper>

			<S.MenuNav className="hidden md:block">
				<S.MenuLink href="/">Home</S.MenuLink>
				<S.MenuLink href="/games">Explore</S.MenuLink>
			</S.MenuNav>

			{!loading && (
				<>
					<S.MenuGroup>
						<S.IconWrapper>
							<FontAwesomeIcon icon={faMagnifyingGlass} className="!size-[16px]" aria-label="Search" />
						</S.IconWrapper>
						<S.IconWrapper>
							<Link href="/cart" className="flex items-center justify-center md:hidden">
								<FontAwesomeIcon
									icon={faCartShopping}
									className="!size-[18px]"
									aria-label="Open Shopping Cart"
								/>
							</Link>
							<CartDropdown className="hidden md:block" />
						</S.IconWrapper>
						{!username ? (
							<Button 
								as={Link} 
								href="/sign-in"
								className="hidden md:inline-flex"
							>
								Sign in
							</Button>
						) : (
							<UserDropdown className="hidden md:block" username={username} />
						)}
					</S.MenuGroup>

					<S.MenuFull $isOpen={isOpen} aria-hidden={!isOpen}>
						<FontAwesomeIcon
							icon={faXmark}
							aria-label="Close Menu"
							onClick={() => setIsOpen(false)}
						/>

						<S.MenuNav>
							<S.MenuLink href="/">Home</S.MenuLink>
							<S.MenuLink href="/games">Explore</S.MenuLink>

							{!!username && (
								<>
									<S.MenuLink href="/profile/me">My Account</S.MenuLink>
									<S.MenuLink href="/wishlist">Wishlist</S.MenuLink>
								</>
							)}
						</S.MenuNav>

						{!username && (
							<S.RegisterBox>
								<Button as={Link} href="/sign-in" fullWidth size="large">
									Sign In
								</Button>
								<span className="block my-xxsmall mx-0 text-xsmall">or</span>
								<S.CreateAccount href="/sign-up" title="Sign Up">
									Sign Up
								</S.CreateAccount>
							</S.RegisterBox>
						)}
					</S.MenuFull>
				</>
			)}

		</S.MenuContainer>
	);
};

export default Menu;
