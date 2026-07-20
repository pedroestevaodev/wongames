import { Meta, StoryObj } from '@storybook/react';
import Logo, { LogoProps } from '@/components/Logo';

export default {
	title: 'Page/Logo',
	component: Logo,
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'dark'
		}
	},
	decorators: [
		(Story) => (
			<div style={{ maxWidth: '130rem', margin: '0 auto' }}>
				<Story />
			</div>
		)
	]
} as Meta<LogoProps>;

export const Default: StoryObj<LogoProps> = {};
