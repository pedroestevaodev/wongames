import { Meta, StoryObj } from '@storybook/react';
import ShowCase, { ShowCaseProps } from '@/components/ShowCase';
import highlightItems from '@/components/Highlight/mocks/mock';
import gameCardSliderItems from '@/components/GameCardSlider/mocks/mock';
import { fn } from "@storybook/test";

export default {
	title: 'ShowCase',
	component: ShowCase,
	argTypes: {},
	parameters: {
		backgrounds: {
			default: 'dark'
		}
	},
	args: {
		onClick: fn()
	},
	decorators: [
		(Story) => (
			<div style={{ margin: '0 auto', padding: '3rem 0' }}>
				<Story />
			</div>
		)
	]
} as Meta<ShowCaseProps>;

export const Default: StoryObj<ShowCaseProps> = {
	args: {
		title: 'Most Popular',
		highlight: highlightItems,
		games: gameCardSliderItems
	}
};

export const WithoutHighlight: StoryObj<ShowCaseProps> = {
	args: {
		title: 'Most Popular',
		games: gameCardSliderItems
	}
};

export const WithoutGames: StoryObj<ShowCaseProps> = {
	args: {
		title: 'Most Popular',
		highlight: highlightItems
	}
};
