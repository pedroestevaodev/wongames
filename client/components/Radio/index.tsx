'use client';

import React, { InputHTMLAttributes } from 'react';
import * as S from './styles';

type RadioValue = string | ReadonlyArray<string> | number;

export type RadioProps = {
	onCheck?: (value?: RadioValue) => void;
	label?: string;
	labelColor?: 'white' | 'black';
	labelFor?: string;
	value?: RadioValue;
} & InputHTMLAttributes<HTMLInputElement>;

const Radio = ({
	label,
	onCheck,
	labelColor = 'white',
	labelFor = '',
	value,
	...props
}: RadioProps) => {
	const onChange = () => {
		if (onCheck) {
			onCheck(value);
		}
	};

	return (
		<S.RadioContainer className="flex items-center">
			<S.Input
				id={labelFor}
				type="radio"
				value={value}
				onChange={onChange}
				{...props}
			/>
			{!!label && (
				<S.Label $labelColor={labelColor} htmlFor={labelFor}>
					{label}
				</S.Label>
			)}
		</S.RadioContainer>
	);
};

export default Radio;
