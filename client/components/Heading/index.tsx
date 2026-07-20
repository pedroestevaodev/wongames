'use client';

import React from 'react';
import * as S from './styles';

export type LineColors = 'primary' | 'secondary';

export type HeadingProps = {
	children: React.ReactNode;
	color?: 'white' | 'black';
	lineLeft?: boolean;
	lineBottom?: boolean;
	lineColor?: LineColors;
	size?: 'small' | 'medium' | 'huge';
	className?: string;
};

const Heading = ({
	children,
	color = 'white',
	lineLeft = false,
	lineBottom = false,
	lineColor = 'primary',
	size = 'medium',
	className = "",
}: HeadingProps) => {
	return (
		<S.HeadingContainer
			className={className}
			$color={color}
			$lineLeft={lineLeft}
			$lineBottom={lineBottom}
			$lineColor={lineColor}
			$size={size}
		>
			{children}
		</S.HeadingContainer>
	);
};

export default Heading;
