import { Meta, StoryObj } from '@storybook/react';
import Wishlist, { WishlistLayoutProps } from '@/components/Layouts/Wishlist';
import wishlistLayoutMock from '../mocks/mock';

export default {
	title: 'Layout/Wishlist',
	component: Wishlist,
	parameters: {
		layout: 'fullscreen'
	},
	args: wishlistLayoutMock
} as Meta<WishlistLayoutProps>;

export const Default: StoryObj<WishlistLayoutProps> = {};
