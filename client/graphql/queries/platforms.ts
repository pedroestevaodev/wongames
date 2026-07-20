import { gql } from '@apollo/client';

export const GET_PLATFORMS = gql`
	query GetPlatforms($limit: Int!, $start: Int, $sort: [String]) {
		platforms(pagination: { limit: $limit, start: $start }, sort: $sort) {
			name
			slug
		}
	}
`;
