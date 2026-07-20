'use client';

import styled, { css } from 'styled-components';

export const RadioContainer = styled.div``;

export const Input = styled.input`
	${() => css`
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		appearance: none;
		width: 1.8rem;
		height: 1.8rem;
		border: 0.2rem solid #f231a5;
		border-radius: 50%;
		background-color: transparent;
		transition: background-color border 0.1s ease-in-out;
		outline: none;

		&:focus {
			box-shadow: 0 0 0.5rem #f231a5;
		}

		&::before {
			content: '';
			position: absolute;
			width: 0.8rem;
			height: 0.8rem;
			border-radius: 50%;
			background-color: #f231a5;
			transition: opacity 0.1s ease-in-out;
			opacity: 0;
		}

		&:checked {
			&::before {
				opacity: 1;
			}
		}
	`}
`;

export const Label = styled.label<{ $labelColor: 'white' | 'black'}>`
	${({ $labelColor }) => css`
		cursor: pointer;
		padding-left: 0.8rem;
		color: ${$labelColor === 'white' ? '#FAFAFA' : '#030517'};
		line-height: 1;
	`}
`;
