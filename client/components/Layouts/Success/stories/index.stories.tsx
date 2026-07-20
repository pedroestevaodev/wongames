import { Meta, StoryObj } from '@storybook/react';
import Success, { SuccessLayoutProps } from '@/components/Layouts/Success';

export default {
	title: 'Layout/Success',
	component: Success,
	parameters: {
		layout: 'fullscreen'
	},
} as Meta<SuccessLayoutProps>;

export const Default: StoryObj<SuccessLayoutProps> = {};
