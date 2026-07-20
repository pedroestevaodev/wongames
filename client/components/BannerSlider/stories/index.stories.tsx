import { Meta, StoryObj } from '@storybook/react';
import BannerSlider, { BannerSliderProps } from '@/components/BannerSlider';
import items from '../mocks/mock';
import { fn } from "@storybook/test";

export default {
	title: 'BannerSlider',
	component: BannerSlider,
	argTypes: {},
	args: {
		items,
		onClick: fn()
	},
	parameters: {
		backgrounds: {
			default: 'dark'
		}
	},
	decorators: [
		(Story) => (
			<div style={{ width: '100%', height: '100vh' }}>
				<div
					style={{ maxWidth: '130rem', margin: '0 auto', padding: '50px 0' }}
				>
					<Story />
				</div>
			</div>
		)
	]
} as Meta<BannerSliderProps>;

export const Default: StoryObj<BannerSliderProps> = {};
