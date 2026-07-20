'use client';

import React, { InputHTMLAttributes, useState } from 'react';
import * as S from './styles';

export type CheckboxProps = {
	label?: string;
	labelFor?: string;
	labelColor?: 'white' | 'black';
	value?: string | ReadonlyArray<string> | number;
	onCheck?: (status: boolean) => void;
	isChecked?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const Checkbox = ({
	label,
	labelFor = '',
	labelColor = 'white',
	value,
	onCheck,
	isChecked = false,
	...props
}: CheckboxProps) => {
	const [checked, setChecked] = useState<boolean>(isChecked);

	const onChange = () => {
		const status = !checked;

		setChecked(status);

		if (onCheck) {
			onCheck(status);
		}
	};

	return (
		<S.CheckboxContainer className="flex items-center">
			<S.Input
				id={labelFor}
				type="checkbox"
				onChange={onChange}
				checked={checked}
				value={value}
				{...props}
			/>
			{!!label && (
				<S.Label htmlFor={labelFor} $labelColor={labelColor}>
					{label}
				</S.Label>
			)}
		</S.CheckboxContainer>
	);
};

export default Checkbox;
