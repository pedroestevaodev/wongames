import { gql } from '@apollo/client';

export const HighlightFragment = gql`
	fragment HighlightFragment on ComponentPageHighlight {
		title
		subTitle
		background {
			url
		}
		floatImage {
			url
		}
		buttonLabel
		buttonLink
		alignment
	}
`;
