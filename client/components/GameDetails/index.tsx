import React from 'react';
import * as S from './styles';
import Heading from '../Heading';
import { RiWindowsFill, RiAppleFill, RiUbuntuFill } from '@remixicon/react';
import { formatDate } from '@/utils/formats';

export type PlatformProps = 'windows' | 'linux' | 'mac';

export type RatingProps = 'BR0' | 'BR10' | 'BR12' | 'BR14' | 'BR16' | 'BR18';

export type GameDetailsProps = {
	developer: string;
	publisher: string;
	platforms: PlatformProps[];
	releaseDate: string;
	rating: RatingProps;
	genres: string[];
};

const GameDetails = ({
	developer,
	publisher,
	releaseDate,
	platforms,
	rating,
	genres
}: GameDetailsProps) => {
	const platformIcons = {
		windows: <RiWindowsFill size={18} />,
		linux: <RiUbuntuFill size={18} />,
		mac: <RiAppleFill size={18} />
	};

	return (
		<S.GameDetailsContainer>
			<Heading className="hidden sm:block" lineLeft lineColor="secondary">
				Game Details
			</Heading>

			<S.Content>
				<S.Block>
					<S.Label>Developer</S.Label>
					<S.Description>{developer}</S.Description>
				</S.Block>

				<S.Block>
					<S.Label>Release Date</S.Label>
					<S.Description>{formatDate(releaseDate)}</S.Description>
				</S.Block>

				<S.Block>
					<S.Label>Platforms</S.Label>
					<S.IconsWrapper>
						{platforms.map((icon: PlatformProps) => (
							<S.Icon key={icon}>{platformIcons[icon]}</S.Icon>
						))}
					</S.IconsWrapper>
				</S.Block>

				<S.Block>
					<S.Label>Publisher</S.Label>
					<S.Description>{publisher}</S.Description>
				</S.Block>

				<S.Block>
					<S.Label>Rating</S.Label>
					<S.Description>
						{rating === 'BR0' ? 'FREE' : `${rating.replace('BR', '')}+`}
					</S.Description>
				</S.Block>

				<S.Block>
					<S.Label>Genres</S.Label>
					<S.Description>{genres.join(' / ')}</S.Description>
				</S.Block>
			</S.Content>
		</S.GameDetailsContainer>
	);
};

export default GameDetails;
