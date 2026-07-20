import 'styled-components';
import { ThemeType } from '../public/styles/theme';

declare module 'styled-components' {
    export type DefaultTheme = ThemeType;
};
