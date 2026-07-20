import { Meta, StoryObj } from '@storybook/react';
import Dropdown, { DropdownProps } from '@/components/Dropdown';
import { fn } from "@storybook/test";

export default {
	title: 'Dropdown',
	component: Dropdown,
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'dark'
		}
	},
	args: {
		onClick: fn()
	}
} as Meta<DropdownProps>;

export const Default: StoryObj<DropdownProps> = {
	args: {
		title: 'Click here',
		children: 'Content'
	}
};
