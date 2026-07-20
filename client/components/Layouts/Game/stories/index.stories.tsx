import { Meta, StoryObj } from '@storybook/react';
import Game, { GameLayoutProps } from '@/components/Layouts/Game';
import gamePageMock from '../mocks/mock';

export default {
	title: 'Layout/Game',
	component: Game,
	parameters: {
		layout: 'fullscreen'
	},
	args: gamePageMock
} as Meta<GameLayoutProps>;

export const Default: StoryObj<GameLayoutProps> = {};
