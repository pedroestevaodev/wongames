'use client';

import React, { useState, useEffect } from 'react';
import * as S from './styles';

export type DropdownProps = {
	title: React.ReactNode;
	children: React.ReactNode;
};

const Dropdown = ({ title, children }: DropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : 'initial';

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	return (
		<S.DropdownContainer $isOpen={isOpen}>
			<S.Title onClick={() => setIsOpen(!isOpen)}>{title}</S.Title>

			<S.Content aria-hidden={!isOpen}>{children}</S.Content>
			<S.Overlay aria-hidden={!isOpen} onClick={() => setIsOpen(!isOpen)} />
		</S.DropdownContainer>
	);
};

export default Dropdown;
