import { Meta, StoryObj } from '@storybook/react';
import FormSignIn from '@/components/FormSignIn';

export default {
	title: 'Form/FormSignIn',
	component: FormSignIn,
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'light'
		}
	},
	decorators: [
		(Story) => (
			<div style={{ width: 300, margin: 'auto' }}>
				<Story />
			</div>
		)
	]
} as Meta;

export const Default: StoryObj = {};
