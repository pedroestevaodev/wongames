import { Meta, StoryObj } from '@storybook/react';
import TextContent, { TextContentProps } from '@/components/TextContent';
import TextContentMock from '../mocks/mock';

export default {
	title: 'TextContent',
	component: TextContent,
	args: TextContentMock,
	parameters: {
		layout: 'fullscreen',
		backgrounds: {
			default: 'won-dark'
		}
	}
} as Meta<TextContentProps>;

export const Default: StoryObj<TextContentProps> = {};
