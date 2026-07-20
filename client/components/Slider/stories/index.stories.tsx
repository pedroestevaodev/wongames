import { Meta, StoryObj } from '@storybook/react';
import Slider from '@/components/Slider';
import { Settings } from 'react-slick';
import styled from 'styled-components';

export default {
	title: 'Slider',
	component: Slider,
	parameters: {
		backgrounds: {
			default: 'dark'
		}
	},
	decorators: [
		(Story) => (
			<div style={{ height: '100vh' }}>
				<div style={{ margin: '0 auto', padding: '3rem 0' }}>
					<Story />
				</div>
			</div>
		)
	]
} as Meta;

const settings: Settings = {
	dots: true,
	infinite: false,
	speed: 500,
	slidesToShow: 3,
	slidesToScroll: 1
};

const Slide = styled.div`
	background-color: gray;
	width: 30rem;
	padding: 10rem 0;
	border: 0.1rem solid red;
	color: white;
	text-align: center;
`;

export const Horizontal: StoryObj = {
	render: () => (
		<Slider settings={settings}>
			<Slide>Slide 1</Slide>
			<Slide>Slide 2</Slide>
			<Slide>Slide 3</Slide>
			<Slide>Slide 4</Slide>
			<Slide>Slide 5</Slide>
		</Slider>
	)
};

const verticalSettings: Settings = {
	vertical: true,
	verticalSwiping: true,
	dots: true,
	infinite: false,
	slidesToShow: 1
};

export const Vertical: StoryObj = {
	render: () => (
		<Slider settings={verticalSettings}>
			<Slide>Slide 1</Slide>
			<Slide>Slide 2</Slide>
			<Slide>Slide 3</Slide>
			<Slide>Slide 4</Slide>
			<Slide>Slide 5</Slide>
		</Slider>
	)
};
