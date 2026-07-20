import Success from "@/components/Layouts/Success";
import { GameFragmentFragment, GetRecommendedQuery, GetRecommendedQueryVariables, HighlightFragmentFragment } from "@/graphql/generated/graphql";
import { GET_RECOMMENDED } from "@/graphql/queries/recommended";
import { getClient } from "@/lib/apolloClient";
import { gamesMapper, highlightMapper } from "@/utils/mappers";

const SuccessPage = async () => {
    const {
        data: { recommended }
    } = await getClient().query<GetRecommendedQuery, GetRecommendedQueryVariables>({
        query: GET_RECOMMENDED,
        context: {
            fetchOptions: {
                next: { revalidate: 60 * 60 }
            },
        },
    });

    return (
        <Success 
            recommendedTitle={recommended?.section.title || "You may like these games"}
            recommendedGames={gamesMapper(recommended?.section.games as GameFragmentFragment[])}
            recommendedHighlight={highlightMapper(recommended?.section.highlight as HighlightFragmentFragment)}
        />
    );
};

export default SuccessPage;