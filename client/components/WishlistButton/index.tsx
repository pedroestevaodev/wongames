'use client';

import React from 'react';
import Button, { ButtonProps } from "../Button";
import { useSession } from "next-auth/react";
import { useWishlist } from "@/hooks/useWishlist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartFavorited } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

export type WishlistButtonProps = {
	id: string
	hasText?: boolean
} & Pick<ButtonProps, 'size'>;

const WishlistButton = ({
	id,
	hasText,
	size = 'small',
}: WishlistButtonProps) => {
	const { data: session } = useSession();

	const {
		isInWishlist,
		addToWishlist,
		removeFromWishlist,
		loading: loadingWishlist,
	} = useWishlist();

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		return isInWishlist(id) ? removeFromWishlist(id) : addToWishlist(id);
	};

	const ButtonText = isInWishlist(id) ? "Remove from Wishlist" : "Add to Wishlist";

	if (!session) return null;

	return (
		<Button
			icon={
				isInWishlist(id) ? (
					<FontAwesomeIcon icon={faHeartFavorited} />
				) : (
					<FontAwesomeIcon icon={faHeart} />
				)
			}
			onClick={handleClick}
			minimal
			size={size}
			disabled={loadingWishlist}
			style={{ filter: 'none' }}
			aria-label={ButtonText}
		>
			{hasText && ButtonText}
		</Button>
	);
};

export default WishlistButton;
