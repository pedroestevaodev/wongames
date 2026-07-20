import { Meta, StoryObj } from '@storybook/react';
import GameCardSlider from '@/components/GameCardSlider';
import { GameCardProps } from '@/components/GameCard';
import items from '../mocks/mock';
import { fn } from "@storybook/test";

export default {
	title: 'Game/GameCardSlider',
	component: GameCardSlider,
	args: { 
		items,
		onClick: fn()
	},
	parameters: {
		layout: 'fullscreen',
		backgrounds: {
			default: 'dark'
		}
	},
	decorators: [
		(Story) => (
			<div style={{ width: '100%', height: '100vh', padding: '150px 0' }}>
				<div style={{ margin: '0 auto', maxWidth: '130rem' }}>
					<Story />
				</div>
			</div>
		)
	]
} as Meta;

export const Default: StoryObj<GameCardProps[]> = {
	args: items
};
