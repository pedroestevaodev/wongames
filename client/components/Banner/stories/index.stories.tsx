import { Meta, StoryObj } from '@storybook/react';
import Banner, { BannerProps } from '../';
import { fn } from "@storybook/test";

export default {
	title: 'Banner',
	component: Banner,
	argTypes: {
		ribbon: {
			type: 'string'
		}
	},
	args: {
		img: 'https://images.unsplash.com/photo-1674461315270-d6b04eaff631',
		title: 'Defy death',
		subTitle: '<p>Play the new <strong>CrashLands</strong> season</p>',
		buttonLabel: 'Buy now',
		buttonLink: '/games/defy-death',
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
					style={{ maxWidth: '104rem', margin: '0 auto', padding: '50px 0' }}
				>
					<Story />
				</div>
			</div>
		)
	]
} as Meta<BannerProps>;

export const Default: StoryObj<BannerProps> = {};

export const WithRibbon: StoryObj<BannerProps> = {
	args: {
		ribbon: '20% OFF',
		ribbonSize: 'normal',
		ribbonColor: 'primary'
	}
};
