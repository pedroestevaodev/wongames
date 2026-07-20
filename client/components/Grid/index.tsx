'use client';

import styled from 'styled-components';

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
	gap: 3.2rem;
	margin: 3.2rem 0;
`;

export default Grid;
