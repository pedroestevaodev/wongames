import React from 'react';
import * as S from './styles';
import Button from '../Button';
import Ribbon, { RibbonColorsProps, RibbonSizeProps } from '../Ribbon';
import Link from 'next/link';
import Image from "next/image";

export type BannerProps = {
	img: string;
	title: string;
	subTitle: string;
	buttonLabel: string;
	buttonLink: string;
	ribbon?: React.ReactNode;
	ribbonColor?: RibbonColorsProps;
	ribbonSize?: RibbonSizeProps;
};

const Banner = ({
	img,
	title,
	subTitle,
	buttonLabel,
	buttonLink,
	ribbon,
	ribbonColor = 'primary',
	ribbonSize = 'normal'
}: BannerProps) => {
	return (
		<S.BannerContainer>
			{!!ribbon && (
				<Ribbon color={ribbonColor} size={ribbonSize}>
					{ribbon}
				</Ribbon>
			)}

			<S.ImageWrapper>
				<Image src={img} fill className="object-cover" alt={title} />
			</S.ImageWrapper>

			<S.Caption>
				<S.Title>{title}</S.Title>
				<S.Subtitle dangerouslySetInnerHTML={{ __html: subTitle }}  />
				<Button as={Link} href={buttonLink} size="large">
					{buttonLabel}
				</Button>
			</S.Caption>
		</S.BannerContainer>
	);
};

export default Banner;
