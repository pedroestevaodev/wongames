import { Meta, StoryObj } from '@storybook/react';
import WishlistButton, { WishlistButtonProps } from '@/components/WishlistButton';
import { fn } from "@storybook/test";

export default {
	title: 'Form/WishlistButton',
	component: WishlistButton,
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'dark'
		}
	},
	args: {
		hasText: true,
		onClick: fn()
	},
	argTypes: {
		children: {
			type: 'string'
		},
		size: {
			options: ['small', 'medium', 'large'],
			control: { type: 'select' }
		},
		minimal: {
			control: {
				type: 'boolean'
			}
		}
	}
} as Meta<WishlistButtonProps>;

export const Default: StoryObj<WishlistButtonProps> = {};

export const WithIcon: StoryObj<WishlistButtonProps> = {
	args: {
		size: 'small',
	},
};

export const AsLink: StoryObj<WishlistButtonProps> = {
	args: {
		size: 'large',
	},
};
