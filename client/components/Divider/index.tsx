'use client';

import styled from 'styled-components';

const Divider = styled.hr`
	margin: 5.6rem auto 3.2rem;
	height: 0.1rem;
	background-color: rgba(181, 181, 181, 0.3);
	border: 0;

	@media (min-width: 768px) {
		margin: calc(5.6rem * 2.5) auto 5.6rem;
	}
`;

export default Divider;
