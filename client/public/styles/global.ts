'use client';

import {
	createGlobalStyle,
	css,
} from 'styled-components';
import './tailwind-import.css';

type GlobalStylesProps = {
	removeBg?: boolean;
};

const GlobalStyles = createGlobalStyle<GlobalStylesProps>`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		&::before,
		&::after {
			box-sizing: inherit;
		}
	}

	:root {
		--body-bg: #06092b;

		font-size: 62.5%;
	}

	[data-theme-mode="dark"] {
		--body-bg: #1c1c1c;
	}

	${({ theme, removeBg }) => css`
		body {
			font-family: ${theme.font.family};
			font-size: ${theme.font.sizes.medium};

			${!removeBg && css`
				background-color: ${theme.colors.mainBg};
			`}
		}
	`}
`;

export default GlobalStyles;
