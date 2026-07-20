import { Meta, StoryObj } from '@storybook/react';
import GameDetails, { GameDetailsProps } from '@/components/GameDetails';
import gameDetailsMock from '../mocks/mock';

export default {
	title: 'Game/GameDetails',
	component: GameDetails,
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'dark'
		}
	},
	args: gameDetailsMock,
	argTypes: {
		releaseDate: {
			control: { type: 'date' }
		},
		platforms: {
			options: ['windows', 'linux', 'mac'],
			control: { type: 'inline-check' }
		},
		genres: {
			options: [
				'Role-playing',
				'Adventure',
				'Action',
				'Strategy',
				'Shooter',
				'Narrative'
			],
			control: { type: 'inline-check' }
		}
	},
	decorators: [
		(Story) => (
			<div style={{ maxWidth: '130rem', margin: '0 auto' }}>
				<Story />
			</div>
		)
	]
} as Meta<GameDetailsProps>;

export const Default: StoryObj<GameDetailsProps> = {};
