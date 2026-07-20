import { Meta, StoryObj } from '@storybook/react';
import CartList, { CartListProps } from '@/components/CartList';
import cartListMock from '../mocks/mock';
import { fn } from "@storybook/test";

export default {
	title: 'Payment/CartList',
	component: CartList,
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'dark'
		}
	},
	argTypes: {
		cartContextValue: {
			type: ''
		},
		total: '',
	},
	decorators: [
		(Story) => (
			<div style={{ maxWidth: 800 }}>
				<Story />
			</div>
		)
	]
} as Meta<CartListProps>;

export const Default: StoryObj = {
	args: {
		total: 'R$ 330,00',
		cartContextValue: { items: cartListMock },
		onClick: fn()
	},
};

export const WithButton: StoryObj = {
	args: {
		hasButton: true,
		total: 'R$ 330,00',
		cartContextValue: { items: cartListMock },
		onClick: fn()
	},
};

export const Empty: StoryObj<CartListProps> = {};
