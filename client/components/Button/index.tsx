'use client';

import React, {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	forwardRef
} from 'react';
import * as S from './styles';

export type ButtonTypes =
	| AnchorHTMLAttributes<HTMLAnchorElement>
	| ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = {
	size?: 'small' | 'medium' | 'large';
	fullWidth?: boolean;
	minimal?: boolean;
	icon?: React.ReactNode;
	as?: React.ElementType;
} & ButtonTypes;

const Button: React.ForwardRefRenderFunction<S.ContainerProps, ButtonProps> = (
	{
		children,
		icon,
		size = 'medium',
		fullWidth = false,
		minimal = false,
		...props
	},
	ref
) => {
	return (
		<S.ButtonContainer
			$size={size}
			$fullWidth={fullWidth}
			$hasIcon={!!icon}
			$minimal={minimal}
			ref={ref}
			{...props}
		>
			{!!icon && icon}
			{!!children && <span>{children}</span>}
		</S.ButtonContainer>
	);
};

export default forwardRef(Button);
