'use client';

import React from 'react';
import * as S from './styles';
import Image from 'next/image';
import { RiDownloadCloudFill } from '@remixicon/react';
import { useCart } from "@/hooks/useCart";

export type PaymentInfoProps = {
	number: string
	flag: string | null
	img: string | null
	purchaseDate: string
};

export type GameItemProps = {
	id: string;
	img: string;
	title: string;
	price: string;
	downloadLink?: string;
	paymentInfo?: PaymentInfoProps;
};

const GameItem = ({
	id,
	img,
	title,
	price,
	downloadLink,
	paymentInfo
}: GameItemProps) => {
	const { isInCart, removeFromCart } = useCart();

	return (
		<S.GameItemContainer data-cy="game-item">
			<S.GameContent>
				<S.ImageBox>
					<Image src={img} width={151} height={70} alt={title} />
				</S.ImageBox>

				<S.Content>
					<div className="flex items-center mb-[0.8rem]">
						<S.Title className="truncate">
							{title}
						</S.Title>
						{!!downloadLink && (
							<S.DownloadLink
								href={downloadLink}
								target="_blank"
								aria-label={`Get ${title} here`}
							>
								<RiDownloadCloudFill size={22} />
							</S.DownloadLink>
						)}
					</div>
					<S.Group>
						<S.Price>{price}</S.Price>
						{isInCart(id) && (
							<S.Remove onClick={() => removeFromCart(id)}>Remove</S.Remove>
						)}
					</S.Group>
				</S.Content>
			</S.GameContent>

			{!!paymentInfo && (
				<S.PaymentContent>
					<p>{paymentInfo.purchaseDate}</p>
					<S.CardInfo>
						<span>{paymentInfo.number}</span>
						{!!paymentInfo.img && !!paymentInfo.flag && (
							<Image
								src={paymentInfo.img}
								width={38}
								height={24}
								alt={paymentInfo.flag}
							/>
						)}
					</S.CardInfo>
				</S.PaymentContent>
			)}
		</S.GameItemContainer>
	);
};

export default GameItem;
