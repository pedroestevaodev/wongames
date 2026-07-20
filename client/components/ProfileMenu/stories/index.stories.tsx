import { Meta, StoryObj } from '@storybook/react';
import ProfileMenu, { ProfileMenuProps } from '@/components/ProfileMenu';

export default {
	title: 'Page/ProfileMenu',
	component: ProfileMenu,
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'dark'
		}
	}
} as Meta<ProfileMenuProps>;

export const Default: StoryObj<ProfileMenuProps> = {};
