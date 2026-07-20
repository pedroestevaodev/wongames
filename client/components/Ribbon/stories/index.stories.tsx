import { Meta, StoryObj } from '@storybook/react';
import Ribbon, { RibbonProps } from '@/components/Ribbon';
import { fn } from "@storybook/test";

export default {
	title: 'Ribbon',
	component: Ribbon,
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'dark'
		}
	},
	args: {
		children: 'Best Seller',
		onClick: fn()
	},
	argTypes: {
		children: {
			type: 'string'
		}
	},
	decorators: [
		(Story) => (
			<div
				style={{
					width: '40rem',
					height: '20rem',
					position: 'relative',
					backgroundColor: '#888'
				}}
			>
				<Story />
			</div>
		)
	]
} as Meta<RibbonProps>;

export const Default: StoryObj<RibbonProps> = {};
