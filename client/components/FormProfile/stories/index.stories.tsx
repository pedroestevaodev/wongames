import { Meta, StoryObj } from '@storybook/react';
import FormProfile from '@/components/FormProfile';

export default {
	title: 'Form/FormProfile',
	component: FormProfile,
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'light'
		}
	}
} as Meta;

export const Default: StoryObj = {};
