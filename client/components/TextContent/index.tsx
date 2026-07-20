'use client';

import React from 'react';
import * as S from './styles';
import Heading from '../Heading';

export type TextContentProps = {
	title?: string;
	content: string;
};

const TextContent = ({ title, content }: TextContentProps) => {
	return (
		<S.TextContentContainer>
			{!!title && (
				<Heading lineLeft lineColor="secondary">
					{title}
				</Heading>
			)}

			<div
				className="text-content"
				dangerouslySetInnerHTML={{ __html: content }}
			></div>
		</S.TextContentContainer>
	);
};

export default TextContent;
