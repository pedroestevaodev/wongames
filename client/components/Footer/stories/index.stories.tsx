import { Meta, StoryObj } from '@storybook/react';
import Footer from '@/components/Footer';

export default {
	title: 'Page/Footer',
	component: Footer,
	parameters: {
		backgrounds: {
			default: 'light'
		}
	},
	decorators: [
		(Story) => (
			<div style={{ maxWidth: '130rem', margin: '30px auto 0' }}>
				<Story />
			</div>
		)
	]
} as Meta;

export const Default: StoryObj = {};
