import { Meta, StoryObj } from '@storybook/react';
import GameCard, { GameCardProps } from '@/components/GameCard';
import { fn } from "@storybook/test";
import { CartContextData } from "@/hooks/useCart";

export default {
	title: 'Game/GameCard',
	component: GameCard,
	argTypes: {
		ribbon: {
			type: 'string'
		},
		onFav: {
			action: 'clicked'
		}
	},
	args: {
		slug: 'population-zero',
		title: 'Population Zero',
		developer: 'Rockstar Games',
		img: 'https://images.unsplash.com/photo-1674461315270-d6b04eaff631',
		price: 235,
		promotionalPrice: 200,
		onClick: fn()
	},
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'dark'
		}
	},
	decorators: [
		(Story) => (
			<div style={{ width: '30rem' }}>
				<Story />
			</div>
		)
	]
} as Meta;

export const Default: StoryObj<GameCardProps> = {};

export const IsInCart: StoryObj<GameCardProps & CartContextData> = {
	args: {
		isInCart: () => true,
	},
};

export const WithRibbon: StoryObj<GameCardProps> = {
	args: {
		ribbon: '20% OFF',
		ribbonSize: 'small',
		ribbonColor: 'primary',
	},
};
