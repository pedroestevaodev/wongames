import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
	query GetCategories($limit: Int!, $start: Int, $sort: [String]) {
		categories(pagination: { limit: $limit, start: $start }, sort: $sort) {
			name
			slug
		}
	}
`;
