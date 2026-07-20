'use client';

import React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProvider } from "styled-components";
import { theme } from "@/public/styles/theme";

const ThemeProviderWrapper = ({
	children
}: React.PropsWithChildren) => {
	return (
		<ThemeProvider theme={theme}>
			<NextThemesProvider
				attribute="data-theme-mode"
				defaultTheme="light"
				themes={['light', 'dark']}
			>
				{children}
			</NextThemesProvider>
		</ThemeProvider>
	);
};

export default ThemeProviderWrapper;