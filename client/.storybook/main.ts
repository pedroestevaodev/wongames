import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
	framework: {
		name: '@storybook/nextjs',
		options: {
			builder: {
				fsCache: true,
				lazyCompilation: true
			}
		}
	},
	stories: [
		'../components/**/*.stories.@(ts|tsx)',
		'../app/**/*.stories.@(ts|tsx)'
	],
	addons: [
		'@storybook/addon-controls',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-links',
		'@storybook/addon-onboarding',
		'@storybook/addon-styling-webpack',
		'@storybook/addon-themes',
		'@storybook/icons',
		'@chromatic-com/storybook'
	],
	typescript: {
		reactDocgen: 'react-docgen-typescript'
	},
	staticDirs: ['../public'],
	webpackFinal: async (config, { configType }) => {
		config.resolve = config.resolve ?? {};
		config.resolve.alias = {
			...(config.resolve.alias || {}),
			'@': path.resolve(__dirname, '../'),
			'@/components': path.resolve(__dirname, '../components'),
		};

		if (configType === 'DEVELOPMENT') {
			config.devtool = 'eval-source-map';
		}
		if (configType === 'PRODUCTION') {
			config.devtool = 'source-map';
		}

		return config;
	},
};
export default config;
