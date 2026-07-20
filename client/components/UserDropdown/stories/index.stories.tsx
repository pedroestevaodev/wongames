import { Meta, StoryObj } from '@storybook/react';
import UserDropdown, { UserDropwdownProps } from '@/components/UserDropdown';
import { fn } from "@storybook/test";

export default {
	title: 'UserDropdown',
	component: UserDropdown,
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'dark'
		}
	},
	args: {
		onClick: fn()
	},
	decorators: [
		(Story) => (
			<div
				style={{ maxWidth: '98%', display: 'flex', justifyContent: 'flex-end' }}
			>
				<Story />
			</div>
		)
	]
} as Meta<UserDropwdownProps>;

export const Default: StoryObj<UserDropwdownProps> = {
	args: {
		username: 'Pedro'
	}
};
