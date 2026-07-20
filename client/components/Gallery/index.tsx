'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import * as S from './styles';
import Slider, { SliderSettings } from '../Slider';
import {
	RiArrowLeftSLine,
	RiArrowRightSLine,
	RiCloseLine
} from '@remixicon/react';
import SlickSlider from 'react-slick';

const commonSettings: SliderSettings = {
	infinite: false,
	lazyLoad: 'ondemand',
	arrows: true,
	nextArrow: <RiArrowRightSLine size={35} aria-label="next games" />,
	prevArrow: <RiArrowLeftSLine size={35} aria-label="previous games" />
};

const settings: SliderSettings = {
	...commonSettings,
	slidesToShow: 4,
	responsive: [
		{
			breakpoint: 1375,
			settings: {
				arrows: false,
				slidesToShow: 3.2,
				draggable: true
			}
		},
		{
			breakpoint: 1024,
			settings: {
				arrows: false,
				slidesToShow: 2.2,
				draggable: true
			}
		},
		{
			breakpoint: 768,
			settings: {
				arrows: false,
				slidesToShow: 2.2,
				draggable: true
			}
		}
	]
};

const modalSettings: SliderSettings = {
	...commonSettings,
	slidesToShow: 1
};

export type GalleryImageProps = {
	src: string;
	label: string;
};

export type GalleryProps = {
	items: GalleryImageProps[];
};

const Gallery = ({ items }: GalleryProps) => {
	const slider = useRef<SlickSlider>(null);

	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const handleKeyUp = ({ key }: KeyboardEvent) => {
			if (key === 'Escape') {
				setIsOpen(false);
			}
		};

		window.addEventListener('keyup', handleKeyUp);
		return () => window.removeEventListener('keyup', handleKeyUp);
	}, []);

	return (
		<S.GalleryContainer>
			<Slider ref={slider} settings={settings}>
				{items.map((item, index) => (
					<Image
						key={`gallery-thumb-${index}`}
						role="button"
						src={item.src}
						width={1042}
						height={580}
						alt={`Thumb da galeria: ${item.label}`}
						onClick={() => {
							setIsOpen(true);
							slider.current!.slickGoTo(index, true);
						}}
					/>
				))}
			</Slider>

			<S.Modal $isOpen={isOpen} aria-label="modal" aria-hidden={!isOpen}>
				<S.Close
					role="button"
					aria-label="close modal"
					onClick={() => setIsOpen(false)}
				>
					<RiCloseLine size={40} />
				</S.Close>

				<S.Content>
					<Slider ref={slider} settings={modalSettings}>
						{items.map((item, index) => (
							<Image
								key={`gallery-image-${index}`}
								src={item.src}
								width={1920}
								height={1080}
								alt={`Imagem da galeria: ${item.label}`}
							/>
						))}
					</Slider>
				</S.Content>
			</S.Modal>
		</S.GalleryContainer>
	);
};

export default Gallery;
