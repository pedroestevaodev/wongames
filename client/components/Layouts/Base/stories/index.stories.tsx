import { Meta, StoryObj } from '@storybook/react';
import Base from '@/components/Layouts/Base';

export default {
	title: 'Layout/Base',
	component: Base,
	parameters: {
		layout: 'fullscreen'
	},
	decorators: [
		(Story) => (
			<div style={{ height: '100vh' }}>
				<Story />
			</div>
		)
	]
} as Meta;

export const Default: StoryObj = {};
