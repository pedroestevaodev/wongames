'use client';

import React, { forwardRef, useState } from 'react';
import * as S from './styles';

export type TextFieldProps = {
	onInputChange?: (value: string) => void;
	label?: string;
	initialValue?: string;
	icon?: React.ReactNode;
	iconPosition?: 'left' | 'right';
	disabled?: boolean;
	error?: string;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((
	{
		icon,
		iconPosition = 'left',
		label,
		name,
		initialValue = '',
		error,
		disabled = false,
		onInputChange,
		...props
	},
	ref
) => {
	const [value, setValue] = useState<string>(initialValue);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.currentTarget.value;
		setValue(newValue);

		if (onInputChange) {
			onInputChange(newValue);
		}
	};

	return (
		<S.TextFieldContainer $disabled={disabled} $error={!!error}>
			{!!label && <S.Label htmlFor={name}>{label}</S.Label>}
			<S.InputWrapper>
				{!!icon && <S.Icon $iconPosition={iconPosition}>{icon}</S.Icon>}
				<S.Input
					ref={ref}
					type="text"
					onChange={onChange}
					value={value}
					$iconPosition={iconPosition}
					disabled={disabled}
					name={name}
					{...(label ? { id: name } : {})}
					{...props}
				/>
			</S.InputWrapper>
			{!!error && <S.Error>{error}</S.Error>}
		</S.TextFieldContainer>
	);
});

TextField.displayName = 'TextField';

export default TextField;
