import { Meta, StoryObj } from '@storybook/react';
import Games, { GamesLayoutProps } from '@/components/Layouts/Games';
import { gamePageMock } from '../mocks/mock';

export default {
	title: 'Layout/Games',
	component: Games,
	parameters: {
		layout: 'fullscreen'
	},
	args: gamePageMock
} as Meta<GamesLayoutProps>;

export const Default: StoryObj<GamesLayoutProps> = {};
