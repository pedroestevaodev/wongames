'use client';

import React, { forwardRef } from 'react';
import SlickSlider, { Settings } from 'react-slick';
import * as S from './styles';

export type SliderSettings = Settings;

export type SliderProps = {
	children: React.ReactNode;
	settings: SliderSettings;
};

const Slider: React.ForwardRefRenderFunction<SlickSlider, SliderProps> = (
	{ children, settings },
	ref
) => {
	return (
		<S.SliderContainer>
			<SlickSlider ref={ref} {...settings} data-testid="banner-slider">
				{children}
			</SlickSlider>
		</S.SliderContainer>
	);
};

export default forwardRef(Slider);
