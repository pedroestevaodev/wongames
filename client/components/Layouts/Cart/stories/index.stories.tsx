import { Meta, StoryObj } from '@storybook/react';
import Cart, { CartLayoutProps } from '@/components/Layouts/Cart';
import cartPageMock from '../mocks/mock';

export default {
	title: 'Layout/Cart',
	component: Cart,
	parameters: {
		layout: 'fullscreen'
	},
	args: cartPageMock
} as Meta<CartLayoutProps>;

export const Default: StoryObj<CartLayoutProps> = {};
