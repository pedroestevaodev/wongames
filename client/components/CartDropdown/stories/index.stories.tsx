import { Meta, StoryObj } from '@storybook/react';
import CartDropdown, { CartDropdownProps } from '@/components/CartDropdown';
import cartListMock from '@/components/CartList/mocks/mock';
import { fn } from "@storybook/test";

export default {
	title: 'CartDropdown',
	component: CartDropdown,
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'dark'
		}
	},
	decorators: [
		(Story) => (
			<div
				style={{ maxWidth: '98%', display: 'flex', justifyContent: 'flex-end' }}
			>
				<Story />
			</div>
		)
	]
} as Meta<CartDropdownProps>;

export const Default: StoryObj = {
	args: {
		cartContextValue: {
			items: cartListMock,
			quantity: cartListMock.length,
    		total: 'R$ 300,00'
		},
		onClick: fn()
	},
};

export const Empty: StoryObj<CartDropdownProps> = {};
