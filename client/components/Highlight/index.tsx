'use client';

import React from 'react';
import * as S from './styles';
import Button from '../Button';
import Link from 'next/link';
import Image from "next/image";

export type HighlightProps = {
	title: string;
	subTitle: string;
	backgroundImage: string;
	floatImage?: string;
	buttonLabel: string;
	buttonLink: string;
	alignment?: 'right' | 'left';
};

const Highlight = ({
	title,
	subTitle,
	backgroundImage,
	floatImage,
	buttonLabel,
	buttonLink,
	alignment = 'right'
}: HighlightProps) => {
	return (
		<S.HighlightContainer $alignment={alignment} data-cy="highlight">
			<Image src={backgroundImage} alt={`${title} background`} fill />
			{!!floatImage && (
				<S.FloatImageWrapper>
					<Image src={floatImage} alt={title} width={400} height={300} />
				</S.FloatImageWrapper>
			)}
			<S.Content>
				<S.Title>{title}</S.Title>
				<S.SubTitle>{subTitle}</S.SubTitle>
				<Button as={Link} href={buttonLink}>
					{buttonLabel}
				</Button>
			</S.Content>
		</S.HighlightContainer>
	);
};

export default Highlight;
