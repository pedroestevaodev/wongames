import { Meta, StoryObj } from '@storybook/react';
import CartIcon from '@/components/CartIcon';
import { fn } from "@storybook/test";

export default {
	title: 'CartIcon',
	component: CartIcon,
	args: {
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
			<div style={{ width: '100%', height: '100vh' }}>
				<div
					style={{ maxWidth: '104rem', margin: '0 auto', padding: '50px 0' }}
				>
					<Story />
				</div>
			</div>
		)
	]
} as Meta;

export const Default: StoryObj = {};

export const WithItems: StoryObj = {
	args: {
		quantity: 3
	}
};
