import React from 'react';
import Link from 'next/link';
import * as S from './styles';
import Button from '../Button';

export type EmptyProps = {
	title: string;
	description: string;
	hasLink?: boolean;
};

const Empty = ({ title, description, hasLink }: EmptyProps) => {
	return (
		<S.EmptyContainer>
			<S.EmptyImage
				src="/img/empty.svg"
				width={400}
				height={400}
				alt="A gamer in a couch playing videogame"
				role="image"
			/>

			<S.Title>{title}</S.Title>
			<S.Description>{description}</S.Description>

			{hasLink && (
				<Button as={Link} href="/" size="large">
					Go back to store
				</Button>
			)}
		</S.EmptyContainer>
	);
};

export default Empty;
