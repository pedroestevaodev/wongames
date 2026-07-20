'use client';

import React from 'react';
import * as S from './styles';

export type RibbonColorsProps = 'primary' | 'secondary';

export type RibbonSizeProps = 'normal' | 'small';

export type RibbonProps = {
	children: React.ReactNode;
	color?: RibbonColorsProps;
	size?: RibbonSizeProps;
	className?: string;
};

const Ribbon = ({
	children,
	color = 'primary',
	size = 'normal',
	className = '',
}: RibbonProps) => {
	return (
		<S.RibbonContainer $color={color} $size={size} className={className}>
			{children}
		</S.RibbonContainer>
	);
};

export default Ribbon;
