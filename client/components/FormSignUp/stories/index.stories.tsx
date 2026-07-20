import { Meta, StoryObj } from '@storybook/react';
import FormSignUp from '@/components/FormSignUp';
import { MockedProvider } from "@apollo/client/testing";

export default {
	title: 'Form/FormSignUp',
	component: FormSignUp,
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'light'
		}
	},
	decorators: [
		(Story) => (
			<div style={{ width: 300, margin: 'auto' }}>
				<MockedProvider>
					<Story />
				</MockedProvider>
			</div>
		)
	]
} as Meta;

export const Default: StoryObj = {};
