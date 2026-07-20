import React from 'react';
import type { Preview, StoryContext, StoryFn } from '@storybook/react';
import { ThemeProvider } from "styled-components";
import { withThemeByClassName } from '@storybook/addon-themes';
import GlobalStyles from '../public/styles/global';
import { theme } from '../public/styles/theme';
import { CartContextDefaultValues, CartContext } from '../hooks/useCart';
import '../public/styles/tailwind-import.css';

export const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/
			}
		},
		backgrounds: {
			default: 'won-light',
			values: [
				{
					name: 'won-light',
					value: '#FAFAFA'
				},
				{
					name: 'won-dark',
					value: '#06092B'
				}
			]
		}
	}
};

export const decorators: Parameters<StoryFn<unknown>>[0][] = [
	(Story: React.ComponentType, context: StoryContext) => (
		<ThemeProvider theme={theme}>
			<CartContext.Provider
				value={{
					...CartContextDefaultValues,
					...(context?.args?.cartContextValue || {}),
					...context.args
				}}
			>
				<GlobalStyles removeBg />
				<Story />
			</CartContext.Provider>
		</ThemeProvider>
	),
	withThemeByClassName({
		themes: {
			light: 'light',
			dark: 'dark'
		},
		defaultTheme: 'light'
	})
];
