'use client';

import Link from "next/link";
import { lighten } from "polished";
import styled from 'styled-components';
import { css } from "styled-components";
import media from "styled-media-query";

export const FormProfileContainer = styled.main``;

export const Form = styled.form`
	max-width: 100%;
	display: grid;
	gap: 1.6rem;

	> button {
		margin-top: 5.6rem;
	}

	@media (min-width: 768px) {
		grid-template-columns: 1fr 1fr;
		gap: 3.2rem;

		> button {
			grid-column: 2;
			justify-self: end;
			margin-top: 0;
		}
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 2rem;

	button, a {
		box-shadow: none !important;
	}

	${media.greaterThan('medium')`
		grid-column: 2;
	`}
`;

export const ForgotPassword = styled(Link)`
	${({ theme }) => css`
		display: block;
		font-size: ${theme.font.sizes.small};
		color: ${theme.colors.black};
		text-decoration: none;
		text-align: right;

		&:hover {
			color: ${lighten(0.2, theme.colors.black)};
		}
	`}
`;