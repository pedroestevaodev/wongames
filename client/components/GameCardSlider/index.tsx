'use client';

import React, { useEffect, useState } from 'react';
import * as S from './styles';
import Slider, { SliderSettings } from '../Slider';
import GameCard, { GameCardProps } from '../GameCard';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import SkeletonContainer from "../Skeleton";

const settings: SliderSettings = {
	arrows: true,
	slidesToShow: 4,
	infinite: false,
	lazyLoad: 'ondemand',
	responsive: [
		{
			breakpoint: 1375,
			settings: {
				arrows: false,
				slidesToShow: 3.2
			}
		},
		{
			breakpoint: 1024,
			settings: {
				arrows: false,
				slidesToShow: 2.2
			}
		},
		{
			breakpoint: 570,
			settings: {
				arrows: false,
				slidesToShow: 1.2
			}
		},
		{
			breakpoint: 375,
			settings: {
				arrows: false,
				slidesToShow: 1.1
			}
		}
	],
	nextArrow: <RiArrowRightSLine size={35} aria-label="next games" />,
	prevArrow: <RiArrowLeftSLine size={35} aria-label="previous games" />
};

export type GameCardSliderProps = {
	items: GameCardProps[];
	color?: 'white' | 'black';
};

const GameCardSlider = ({ items, color = 'white' }: GameCardSliderProps) => {
	const [isClient, setIsClient] = useState<boolean>(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) return (
		<S.GameCardSliderContainer className="flex items-center gap-8 overflow-hidden" $color={color}>
			<SkeletonContainer numberOfElements={4}>
				<div className="relative flex flex-col w-full min-w-[300px] h-full rounded-[6px] overflow-hidden bg-white">
					<div className="h-[14rem] min-h-[14rem] overflow-hidden rounded-t-[6px] rounded-b-[0px] w-full">
						<div className="w-full h-full bg-[rgb(209,213,219)] animate-pulse" />
					</div>
					<div className="relative flex flex-col justify-between h-full p-xsmall gap-[8px]">
						<div className="flex items-center flex-col justify-between gap-[5px] w-full">
							<div className="flex items-center gap-2 w-full">
								<div className="w-full h-[24px] bg-[rgb(209,213,219)] rounded-[6px] animate-pulse" />
								<div className="w-[28px] h-[24px] bg-[rgb(209,213,219)] rounded-[50%] animate-pulse" />
							</div>
							<div className="w-full h-[21px] bg-[rgb(209,213,219)] rounded-[6px] animate-pulse" />
						</div>
						<div className="flex items-center justify-end gap-2 w-full">
							<div className="w-[70px] h-[30px] bg-[rgb(209,213,219)] rounded-[6px] animate-pulse" />
							<div className="w-[30px] h-[30px] bg-[rgb(209,213,219)] rounded-[6px] animate-pulse" />
						</div>
					</div>
				</div>
			</SkeletonContainer>
		</S.GameCardSliderContainer>
	);

	return (
		<S.GameCardSliderContainer $color={color}>
			<Slider settings={settings}>
				{items.map((item, index) => (
					<GameCard key={`game-card-${index}`} {...item} />
				))}
			</Slider>
		</S.GameCardSliderContainer>
	);
};

export default GameCardSlider;
