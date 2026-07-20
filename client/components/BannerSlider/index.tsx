'use client';

import React from 'react';
import * as S from './styles';
import Banner, { BannerProps } from '../Banner';
import Slider, { SliderSettings } from '../Slider';

export type BannerSliderProps = {
	items: BannerProps[];
};

const settings: SliderSettings = {
	dots: true,
	arrows: false,
	vertical: true,
	verticalSwiping: true,
	infinite: false,
	responsive: [
		{
			breakpoint: 1170,
			settings: {
				vertical: false,
				verticalSwiping: false
			}
		}
	]
};

const BannerSlider = ({ items }: BannerSliderProps) => {
	return (
		<S.BannerSliderContainer>
			<Slider settings={settings}>
				{items.map((item) => (
					<Banner key={item.title} {...item} />
				))}
			</Slider>
		</S.BannerSliderContainer>
	);
};

export default BannerSlider;
