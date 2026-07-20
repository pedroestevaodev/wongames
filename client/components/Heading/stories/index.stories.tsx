import { Meta, StoryObj } from '@storybook/react';
import Heading, { HeadingProps } from '@/components/Heading';
import { fn } from "@storybook/test";

export default {
	title: 'Heading',
	component: Heading,
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'dark'
		}
	},
	args:{
		onClick: fn()
	},
	argTypes: {
		children: {
			type: 'string'
		}
	}
} as Meta<HeadingProps>;

export const Default: StoryObj<HeadingProps> = {
	args: {
		children: 'Most Populars'
	}
};
