'use client';

import styled from 'styled-components';

export const ProfileContainer = styled.div``;

export const Main = styled.main`
	margin-top: 3.2rem;

	@media (min-width: 768px) {
		display: grid;
		grid-template-columns: 32rem 1fr;
		gap: calc(3.2rem * 2);
	}
`;

export const Content = styled.div`
	background-color: #fafafa;
	color: #030517;
	width: 100%;
	padding: 1.6rem;
`;
