import { Meta, StoryObj } from '@storybook/react';
import Home, { HomeLayoutProps } from '@/components/Layouts/Home';
import homeLayoutMock from '../mocks/mock';

export default {
	title: 'Layout/Home',
	component: Home,
	parameters: {
		layout: 'fullscreen'
	},
	args: homeLayoutMock
} as Meta<HomeLayoutProps>;

export const Default: StoryObj<HomeLayoutProps> = {};
