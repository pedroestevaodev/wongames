import { Meta, StoryObj } from '@storybook/react';
import Profile, { ProfileLayoutProps } from '@/components/Layouts/Profile';
import FormProfile from '@/components/FormProfile';
import { fn } from "@storybook/test";

export default {
	title: 'Layout/Profile',
	component: Profile,
	parameters: {
		layout: 'fullscreen'
	},
	args: {
		children: <FormProfile />,
		onClick: fn()
	}
} as Meta<ProfileLayoutProps>;

export const Default: StoryObj<ProfileLayoutProps> = {};
