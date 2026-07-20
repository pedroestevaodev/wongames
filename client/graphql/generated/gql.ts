/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    mutation MutationRegister($input: UsersPermissionsRegisterInput!) {\n        register(input: $input) {\n            jwt\n        }\n    }\n": typeof types.MutationRegisterDocument,
    "\n    mutation MutationCreateWishlist($data: WishlistInput!) {\n        createWishlist(data: $data) {\n            id: documentId\n            games {\n                ...GameFragment\n            }\n        }\n    }\n\n    \n": typeof types.MutationCreateWishlistDocument,
    "\n    mutation MutationUpdateWishlist($documentId: ID!, $data: WishlistInput!) {\n        updateWishlist(documentId: $documentId, data: $data) {\n            id: documentId\n            games {\n                ...GameFragment\n            }\n        }\n    }\n\n    \n": typeof types.MutationUpdateWishlistDocument,
    "\n\tquery GetCategories($limit: Int!, $start: Int, $sort: [String]) {\n\t\tcategories(pagination: { limit: $limit, start: $start }, sort: $sort) {\n\t\t\tname\n\t\t\tslug\n\t\t}\n\t}\n": typeof types.GetCategoriesDocument,
    "\n\tfragment BannerFragment on Banner {\n\t\ttitle\n\t\tsubTitle\n\t\timage {\n\t\t\turl\n\t\t}\n\t\tbutton {\n\t\t\tlabel\n\t\t\tlink\n\t\t}\n\t\tribbon {\n\t\t\ttext\n\t\t\tcolor\n\t\t\tsize\n\t\t}\n\t}\n": typeof types.BannerFragmentFragmentDoc,
    "\n\tfragment GameFragment on Game {\n\t\tid: documentId\n\t\tname\n\t\tslug\n\t\tcover {\n\t\t\turl\n\t\t}\n\t\tdevelopers {\n\t\t\tname\n\t\t}\n\t\tprice\n\t}\n": typeof types.GameFragmentFragmentDoc,
    "\n\tfragment HighlightFragment on ComponentPageHighlight {\n\t\ttitle\n\t\tsubTitle\n\t\tbackground {\n\t\t\turl\n\t\t}\n\t\tfloatImage {\n\t\t\turl\n\t\t}\n\t\tbuttonLabel\n\t\tbuttonLink\n\t\talignment\n\t}\n": typeof types.HighlightFragmentFragmentDoc,
    "\n\tquery GetGames($limit: Int, $start: Int, $filters: GameFiltersInput, $sort: [String]) {\n\t\tgames(\n\t\t\tpagination: { limit: $limit, start: $start } \n\t\t\tfilters: $filters\n\t\t\tsort: $sort\n\t\t) {\n\t\t\t...GameFragment\n\t\t}\n\n\t\tgamesMeta: games_connection(\n\t\t\tpagination: { limit: $limit, start: $start }\n\t\t\tfilters: $filters\n\t\t\tsort: $sort\n\t\t) {\n\t\t\tpageInfo {\n\t\t\t\tpage\n\t\t\t\tpageCount\n\t\t\t\tpageSize\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n\n\t\n": typeof types.GetGamesDocument,
    "\n\tquery GetGameBySlug($slug: String!) {\n\t\tgames(filters: { slug: { eq: $slug } }) {\n\t\t\tid: documentId\n\t\t\tname\n\t\t\tshort_description\n\t\t\tdescription\n\t\t\tprice\n\t\t\trating\n\t\t\trelease_date\n\t\t\tgallery {\n\t\t\t\turl\n\t\t\t\talternativeText\n\t\t\t}\n\t\t\tcover {\n\t\t\t\turl\n\t\t\t}\n\t\t\tdevelopers {\n\t\t\t\tname\n\t\t\t}\n\t\t\tpublisher {\n\t\t\t\tname\n\t\t\t}\n\t\t\tcategories {\n\t\t\t\tname\n\t\t\t}\n\t\t\tplatforms {\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetGameBySlugDocument,
    "\n\tquery GetHome($date: Date!) {\n\t\tbanners {\n\t\t\t...BannerFragment\n\t\t}\n\n\t\tnewGames: games(\n\t\t\tfilters: { release_date: { lte: $date } }\n\t\t\tsort: \"release_date:desc\"\n\t\t\tpagination: { limit: 8 }\n\t\t) {\n\t\t\t...GameFragment\n\t\t}\n\n\t\tupcomingGames: games(\n\t\t\tfilters: { release_date: { gt: $date } }\n\t\t\tsort: \"release_date:asc\"\n\t\t\tpagination: { limit: 8 }\n\t\t) {\n\t\t\t...GameFragment\n\t\t}\n\n\t\tfreeGames: games(\n\t\t\tfilters: { price: { eq: 0 } }\n\t\t\tsort: \"release_date:desc\"\n\t\t\tpagination: { limit: 8 }\n\t\t) {\n\t\t\t...GameFragment\n\t\t}\n\n\t\tsections: home {\n\t\t\tnewGames {\n\t\t\t\ttitle\n\t\t\t\thighlight {\n\t\t\t\t\t...HighlightFragment\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tpopularGames {\n\t\t\t\ttitle\n\t\t\t\thighlight {\n\t\t\t\t\t...HighlightFragment\n\t\t\t\t}\n\t\t\t\tgames(pagination: { limit: 8 }) {\n\t\t\t\t\t...GameFragment\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tupcomingGames {\n\t\t\t\ttitle\n\t\t\t\thighlight {\n\t\t\t\t\t...HighlightFragment\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tfreeGames {\n\t\t\t\ttitle\n\t\t\t\thighlight {\n\t\t\t\t\t...HighlightFragment\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t\n\t\n\t\n": typeof types.GetHomeDocument,
    "\n    query GetOrders($identifier: ID!) {\n        orders(filters: { user: { documentId: { eq: $identifier } } }) {\n            id: documentId\n            createdAt\n            card_brand\n            card_last4\n            games {\n                ...GameFragment\n            }\n        }\n    }\n\n    \n": typeof types.GetOrdersDocument,
    "\n\tquery GetPlatforms($limit: Int!, $start: Int, $sort: [String]) {\n\t\tplatforms(pagination: { limit: $limit, start: $start }, sort: $sort) {\n\t\t\tname\n\t\t\tslug\n\t\t}\n\t}\n": typeof types.GetPlatformsDocument,
    "\n    query GetProfileMe {\n        me {\n            username,\n            email,\n        }\n    }\n": typeof types.GetProfileMeDocument,
    "\n\tquery GetRecommended {\n\t\trecommended {\n\t\t\tsection {\n\t\t\t\ttitle\n\t\t\t\thighlight {\n\t\t\t\t\t...HighlightFragment\n\t\t\t\t}\n\t\t\t\tgames {\n\t\t\t\t\t...GameFragment\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n    \n    \n": typeof types.GetRecommendedDocument,
    "\n\tquery GetUpcoming($date: Date!) {\n\t\tupcomingGames: games(\n\t\t\tfilters: { release_date: { gt: $date } }\n\t\t\tsort: \"release_date:asc\"\n\t\t\tpagination: { limit: 8 }\n\t\t) {\n\t\t\t...GameFragment\n\t\t}\n\n\t\tshowcase: home {\n\t\t\tupcomingGames {\n\t\t\t\ttitle\n\t\t\t\thighlight {\n\t\t\t\t\t...HighlightFragment\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t\n\t\n": typeof types.GetUpcomingDocument,
    "\n    query GetWishlist($documentId: ID!) {\n        wishlists(filters: { user: { documentId: { eq: $documentId } } }) {\n            id: documentId\n            games {\n                ...GameFragment\n            }  \n        }\n    }\n    \n    \n": typeof types.GetWishlistDocument,
};
const documents: Documents = {
    "\n    mutation MutationRegister($input: UsersPermissionsRegisterInput!) {\n        register(input: $input) {\n            jwt\n        }\n    }\n": types.MutationRegisterDocument,
    "\n    mutation MutationCreateWishlist($data: WishlistInput!) {\n        createWishlist(data: $data) {\n            id: documentId\n            games {\n                ...GameFragment\n            }\n        }\n    }\n\n    \n": types.MutationCreateWishlistDocument,
    "\n    mutation MutationUpdateWishlist($documentId: ID!, $data: WishlistInput!) {\n        updateWishlist(documentId: $documentId, data: $data) {\n            id: documentId\n            games {\n                ...GameFragment\n            }\n        }\n    }\n\n    \n": types.MutationUpdateWishlistDocument,
    "\n\tquery GetCategories($limit: Int!, $start: Int, $sort: [String]) {\n\t\tcategories(pagination: { limit: $limit, start: $start }, sort: $sort) {\n\t\t\tname\n\t\t\tslug\n\t\t}\n\t}\n": types.GetCategoriesDocument,
    "\n\tfragment BannerFragment on Banner {\n\t\ttitle\n\t\tsubTitle\n\t\timage {\n\t\t\turl\n\t\t}\n\t\tbutton {\n\t\t\tlabel\n\t\t\tlink\n\t\t}\n\t\tribbon {\n\t\t\ttext\n\t\t\tcolor\n\t\t\tsize\n\t\t}\n\t}\n": types.BannerFragmentFragmentDoc,
    "\n\tfragment GameFragment on Game {\n\t\tid: documentId\n\t\tname\n\t\tslug\n\t\tcover {\n\t\t\turl\n\t\t}\n\t\tdevelopers {\n\t\t\tname\n\t\t}\n\t\tprice\n\t}\n": types.GameFragmentFragmentDoc,
    "\n\tfragment HighlightFragment on ComponentPageHighlight {\n\t\ttitle\n\t\tsubTitle\n\t\tbackground {\n\t\t\turl\n\t\t}\n\t\tfloatImage {\n\t\t\turl\n\t\t}\n\t\tbuttonLabel\n\t\tbuttonLink\n\t\talignment\n\t}\n": types.HighlightFragmentFragmentDoc,
    "\n\tquery GetGames($limit: Int, $start: Int, $filters: GameFiltersInput, $sort: [String]) {\n\t\tgames(\n\t\t\tpagination: { limit: $limit, start: $start } \n\t\t\tfilters: $filters\n\t\t\tsort: $sort\n\t\t) {\n\t\t\t...GameFragment\n\t\t}\n\n\t\tgamesMeta: games_connection(\n\t\t\tpagination: { limit: $limit, start: $start }\n\t\t\tfilters: $filters\n\t\t\tsort: $sort\n\t\t) {\n\t\t\tpageInfo {\n\t\t\t\tpage\n\t\t\t\tpageCount\n\t\t\t\tpageSize\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n\n\t\n": types.GetGamesDocument,
    "\n\tquery GetGameBySlug($slug: String!) {\n\t\tgames(filters: { slug: { eq: $slug } }) {\n\t\t\tid: documentId\n\t\t\tname\n\t\t\tshort_description\n\t\t\tdescription\n\t\t\tprice\n\t\t\trating\n\t\t\trelease_date\n\t\t\tgallery {\n\t\t\t\turl\n\t\t\t\talternativeText\n\t\t\t}\n\t\t\tcover {\n\t\t\t\turl\n\t\t\t}\n\t\t\tdevelopers {\n\t\t\t\tname\n\t\t\t}\n\t\t\tpublisher {\n\t\t\t\tname\n\t\t\t}\n\t\t\tcategories {\n\t\t\t\tname\n\t\t\t}\n\t\t\tplatforms {\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n": types.GetGameBySlugDocument,
    "\n\tquery GetHome($date: Date!) {\n\t\tbanners {\n\t\t\t...BannerFragment\n\t\t}\n\n\t\tnewGames: games(\n\t\t\tfilters: { release_date: { lte: $date } }\n\t\t\tsort: \"release_date:desc\"\n\t\t\tpagination: { limit: 8 }\n\t\t) {\n\t\t\t...GameFragment\n\t\t}\n\n\t\tupcomingGames: games(\n\t\t\tfilters: { release_date: { gt: $date } }\n\t\t\tsort: \"release_date:asc\"\n\t\t\tpagination: { limit: 8 }\n\t\t) {\n\t\t\t...GameFragment\n\t\t}\n\n\t\tfreeGames: games(\n\t\t\tfilters: { price: { eq: 0 } }\n\t\t\tsort: \"release_date:desc\"\n\t\t\tpagination: { limit: 8 }\n\t\t) {\n\t\t\t...GameFragment\n\t\t}\n\n\t\tsections: home {\n\t\t\tnewGames {\n\t\t\t\ttitle\n\t\t\t\thighlight {\n\t\t\t\t\t...HighlightFragment\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tpopularGames {\n\t\t\t\ttitle\n\t\t\t\thighlight {\n\t\t\t\t\t...HighlightFragment\n\t\t\t\t}\n\t\t\t\tgames(pagination: { limit: 8 }) {\n\t\t\t\t\t...GameFragment\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tupcomingGames {\n\t\t\t\ttitle\n\t\t\t\thighlight {\n\t\t\t\t\t...HighlightFragment\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tfreeGames {\n\t\t\t\ttitle\n\t\t\t\thighlight {\n\t\t\t\t\t...HighlightFragment\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t\n\t\n\t\n": types.GetHomeDocument,
    "\n    query GetOrders($identifier: ID!) {\n        orders(filters: { user: { documentId: { eq: $identifier } } }) {\n            id: documentId\n            createdAt\n            card_brand\n            card_last4\n            games {\n                ...GameFragment\n            }\n        }\n    }\n\n    \n": types.GetOrdersDocument,
    "\n\tquery GetPlatforms($limit: Int!, $start: Int, $sort: [String]) {\n\t\tplatforms(pagination: { limit: $limit, start: $start }, sort: $sort) {\n\t\t\tname\n\t\t\tslug\n\t\t}\n\t}\n": types.GetPlatformsDocument,
    "\n    query GetProfileMe {\n        me {\n            username,\n            email,\n        }\n    }\n": types.GetProfileMeDocument,
    "\n\tquery GetRecommended {\n\t\trecommended {\n\t\t\tsection {\n\t\t\t\ttitle\n\t\t\t\thighlight {\n\t\t\t\t\t...HighlightFragment\n\t\t\t\t}\n\t\t\t\tgames {\n\t\t\t\t\t...GameFragment\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n    \n    \n": types.GetRecommendedDocument,
    "\n\tquery GetUpcoming($date: Date!) {\n\t\tupcomingGames: games(\n\t\t\tfilters: { release_date: { gt: $date } }\n\t\t\tsort: \"release_date:asc\"\n\t\t\tpagination: { limit: 8 }\n\t\t) {\n\t\t\t...GameFragment\n\t\t}\n\n\t\tshowcase: home {\n\t\t\tupcomingGames {\n\t\t\t\ttitle\n\t\t\t\thighlight {\n\t\t\t\t\t...HighlightFragment\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t\n\t\n": types.GetUpcomingDocument,
    "\n    query GetWishlist($documentId: ID!) {\n        wishlists(filters: { user: { documentId: { eq: $documentId } } }) {\n            id: documentId\n            games {\n                ...GameFragment\n            }  \n        }\n    }\n    \n    \n": types.GetWishlistDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation MutationRegister($input: UsersPermissionsRegisterInput!) {\n        register(input: $input) {\n            jwt\n        }\n    }\n"): (typeof documents)["\n    mutation MutationRegister($input: UsersPermissionsRegisterInput!) {\n        register(input: $input) {\n            jwt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation MutationCreateWishlist($data: WishlistInput!) {\n        createWishlist(data: $data) {\n            id: documentId\n            games {\n                ...GameFragment\n            }\n        }\n    }\n\n    \n"): (typeof documents)["\n    mutation MutationCreateWishlist($data: WishlistInput!) {\n        createWishlist(data: $data) {\n            id: documentId\n            games {\n                ...GameFragment\n            }\n        }\n    }\n\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation MutationUpdateWishlist($documentId: ID!, $data: WishlistInput!) {\n        updateWishlist(documentId: $documentId, data: $data) {\n            id: documentId\n            games {\n                ...GameFragment\n            }\n        }\n    }\n\n    \n"): (typeof documents)["\n    mutation MutationUpdateWishlist($documentId: ID!, $data: WishlistInput!) {\n        updateWishlist(documentId: $documentId, data: $data) {\n            id: documentId\n            games {\n                ...GameFragment\n            }\n        }\n    }\n\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetCategories($limit: Int!, $start: Int, $sort: [String]) {\n\t\tcategories(pagination: { limit: $limit, start: $start }, sort: $sort) {\n\t\t\tname\n\t\t\tslug\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetCategories($limit: Int!, $start: Int, $sort: [String]) {\n\t\tcategories(pagination: { limit: $limit, start: $start }, sort: $sort) {\n\t\t\tname\n\t\t\tslug\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment BannerFragment on Banner {\n\t\ttitle\n\t\tsubTitle\n\t\timage {\n\t\t\turl\n\t\t}\n\t\tbutton {\n\t\t\tlabel\n\t\t\tlink\n\t\t}\n\t\tribbon {\n\t\t\ttext\n\t\t\tcolor\n\t\t\tsize\n\t\t}\n\t}\n"): (typeof documents)["\n\tfragment BannerFragment on Banner {\n\t\ttitle\n\t\tsubTitle\n\t\timage {\n\t\t\turl\n\t\t}\n\t\tbutton {\n\t\t\tlabel\n\t\t\tlink\n\t\t}\n\t\tribbon {\n\t\t\ttext\n\t\t\tcolor\n\t\t\tsize\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment GameFragment on Game {\n\t\tid: documentId\n\t\tname\n\t\tslug\n\t\tcover {\n\t\t\turl\n\t\t}\n\t\tdevelopers {\n\t\t\tname\n\t\t}\n\t\tprice\n\t}\n"): (typeof documents)["\n\tfragment GameFragment on Game {\n\t\tid: documentId\n\t\tname\n\t\tslug\n\t\tcover {\n\t\t\turl\n\t\t}\n\t\tdevelopers {\n\t\t\tname\n\t\t}\n\t\tprice\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment HighlightFragment on ComponentPageHighlight {\n\t\ttitle\n\t\tsubTitle\n\t\tbackground {\n\t\t\turl\n\t\t}\n\t\tfloatImage {\n\t\t\turl\n\t\t}\n\t\tbuttonLabel\n\t\tbuttonLink\n\t\talignment\n\t}\n"): (typeof documents)["\n\tfragment HighlightFragment on ComponentPageHighlight {\n\t\ttitle\n\t\tsubTitle\n\t\tbackground {\n\t\t\turl\n\t\t}\n\t\tfloatImage {\n\t\t\turl\n\t\t}\n\t\tbuttonLabel\n\t\tbuttonLink\n\t\talignment\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetGames($limit: Int, $start: Int, $filters: GameFiltersInput, $sort: [String]) {\n\t\tgames(\n\t\t\tpagination: { limit: $limit, start: $start } \n\t\t\tfilters: $filters\n\t\t\tsort: $sort\n\t\t) {\n\t\t\t...GameFragment\n\t\t}\n\n\t\tgamesMeta: games_connection(\n\t\t\tpagination: { limit: $limit, start: $start }\n\t\t\tfilters: $filters\n\t\t\tsort: $sort\n\t\t) {\n\t\t\tpageInfo {\n\t\t\t\tpage\n\t\t\t\tpageCount\n\t\t\t\tpageSize\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n\n\t\n"): (typeof documents)["\n\tquery GetGames($limit: Int, $start: Int, $filters: GameFiltersInput, $sort: [String]) {\n\t\tgames(\n\t\t\tpagination: { limit: $limit, start: $start } \n\t\t\tfilters: $filters\n\t\t\tsort: $sort\n\t\t) {\n\t\t\t...GameFragment\n\t\t}\n\n\t\tgamesMeta: games_connection(\n\t\t\tpagination: { limit: $limit, start: $start }\n\t\t\tfilters: $filters\n\t\t\tsort: $sort\n\t\t) {\n\t\t\tpageInfo {\n\t\t\t\tpage\n\t\t\t\tpageCount\n\t\t\t\tpageSize\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n\n\t\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetGameBySlug($slug: String!) {\n\t\tgames(filters: { slug: { eq: $slug } }) {\n\t\t\tid: documentId\n\t\t\tname\n\t\t\tshort_description\n\t\t\tdescription\n\t\t\tprice\n\t\t\trating\n\t\t\trelease_date\n\t\t\tgallery {\n\t\t\t\turl\n\t\t\t\talternativeText\n\t\t\t}\n\t\t\tcover {\n\t\t\t\turl\n\t\t\t}\n\t\t\tdevelopers {\n\t\t\t\tname\n\t\t\t}\n\t\t\tpublisher {\n\t\t\t\tname\n\t\t\t}\n\t\t\tcategories {\n\t\t\t\tname\n\t\t\t}\n\t\t\tplatforms {\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetGameBySlug($slug: String!) {\n\t\tgames(filters: { slug: { eq: $slug } }) {\n\t\t\tid: documentId\n\t\t\tname\n\t\t\tshort_description\n\t\t\tdescription\n\t\t\tprice\n\t\t\trating\n\t\t\trelease_date\n\t\t\tgallery {\n\t\t\t\turl\n\t\t\t\talternativeText\n\t\t\t}\n\t\t\tcover {\n\t\t\t\turl\n\t\t\t}\n\t\t\tdevelopers {\n\t\t\t\tname\n\t\t\t}\n\t\t\tpublisher {\n\t\t\t\tname\n\t\t\t}\n\t\t\tcategories {\n\t\t\t\tname\n\t\t\t}\n\t\t\tplatforms {\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetHome($date: Date!) {\n\t\tbanners {\n\t\t\t...BannerFragment\n\t\t}\n\n\t\tnewGames: games(\n\t\t\tfilters: { release_date: { lte: $date } }\n\t\t\tsort: \"release_date:desc\"\n\t\t\tpagination: { limit: 8 }\n\t\t) {\n\t\t\t...GameFragment\n\t\t}\n\n\t\tupcomingGames: games(\n\t\t\tfilters: { release_date: { gt: $date } }\n\t\t\tsort: \"release_date:asc\"\n\t\t\tpagination: { limit: 8 }\n\t\t) {\n\t\t\t...GameFragment\n\t\t}\n\n\t\tfreeGames: games(\n\t\t\tfilters: { price: { eq: 0 } }\n\t\t\tsort: \"release_date:desc\"\n\t\t\tpagination: { limit: 8 }\n\t\t) {\n\t\t\t...GameFragment\n\t\t}\n\n\t\tsections: home {\n\t\t\tnewGames {\n\t\t\t\ttitle\n\t\t\t\thighlight {\n\t\t\t\t\t...HighlightFragment\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tpopularGames {\n\t\t\t\ttitle\n\t\t\t\thighlight {\n\t\t\t\t\t...HighlightFragment\n\t\t\t\t}\n\t\t\t\tgames(pagination: { limit: 8 }) {\n\t\t\t\t\t...GameFragment\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tupcomingGames {\n\t\t\t\ttitle\n\t\t\t\thighlight {\n\t\t\t\t\t...HighlightFragment\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tfreeGames {\n\t\t\t\ttitle\n\t\t\t\thighlight {\n\t\t\t\t\t...HighlightFragment\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t\n\t\n\t\n"): (typeof documents)["\n\tquery GetHome($date: Date!) {\n\t\tbanners {\n\t\t\t...BannerFragment\n\t\t}\n\n\t\tnewGames: games(\n\t\t\tfilters: { release_date: { lte: $date } }\n\t\t\tsort: \"release_date:desc\"\n\t\t\tpagination: { limit: 8 }\n\t\t) {\n\t\t\t...GameFragment\n\t\t}\n\n\t\tupcomingGames: games(\n\t\t\tfilters: { release_date: { gt: $date } }\n\t\t\tsort: \"release_date:asc\"\n\t\t\tpagination: { limit: 8 }\n\t\t) {\n\t\t\t...GameFragment\n\t\t}\n\n\t\tfreeGames: games(\n\t\t\tfilters: { price: { eq: 0 } }\n\t\t\tsort: \"release_date:desc\"\n\t\t\tpagination: { limit: 8 }\n\t\t) {\n\t\t\t...GameFragment\n\t\t}\n\n\t\tsections: home {\n\t\t\tnewGames {\n\t\t\t\ttitle\n\t\t\t\thighlight {\n\t\t\t\t\t...HighlightFragment\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tpopularGames {\n\t\t\t\ttitle\n\t\t\t\thighlight {\n\t\t\t\t\t...HighlightFragment\n\t\t\t\t}\n\t\t\t\tgames(pagination: { limit: 8 }) {\n\t\t\t\t\t...GameFragment\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tupcomingGames {\n\t\t\t\ttitle\n\t\t\t\thighlight {\n\t\t\t\t\t...HighlightFragment\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tfreeGames {\n\t\t\t\ttitle\n\t\t\t\thighlight {\n\t\t\t\t\t...HighlightFragment\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t\n\t\n\t\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetOrders($identifier: ID!) {\n        orders(filters: { user: { documentId: { eq: $identifier } } }) {\n            id: documentId\n            createdAt\n            card_brand\n            card_last4\n            games {\n                ...GameFragment\n            }\n        }\n    }\n\n    \n"): (typeof documents)["\n    query GetOrders($identifier: ID!) {\n        orders(filters: { user: { documentId: { eq: $identifier } } }) {\n            id: documentId\n            createdAt\n            card_brand\n            card_last4\n            games {\n                ...GameFragment\n            }\n        }\n    }\n\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetPlatforms($limit: Int!, $start: Int, $sort: [String]) {\n\t\tplatforms(pagination: { limit: $limit, start: $start }, sort: $sort) {\n\t\t\tname\n\t\t\tslug\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetPlatforms($limit: Int!, $start: Int, $sort: [String]) {\n\t\tplatforms(pagination: { limit: $limit, start: $start }, sort: $sort) {\n\t\t\tname\n\t\t\tslug\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetProfileMe {\n        me {\n            username,\n            email,\n        }\n    }\n"): (typeof documents)["\n    query GetProfileMe {\n        me {\n            username,\n            email,\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetRecommended {\n\t\trecommended {\n\t\t\tsection {\n\t\t\t\ttitle\n\t\t\t\thighlight {\n\t\t\t\t\t...HighlightFragment\n\t\t\t\t}\n\t\t\t\tgames {\n\t\t\t\t\t...GameFragment\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n    \n    \n"): (typeof documents)["\n\tquery GetRecommended {\n\t\trecommended {\n\t\t\tsection {\n\t\t\t\ttitle\n\t\t\t\thighlight {\n\t\t\t\t\t...HighlightFragment\n\t\t\t\t}\n\t\t\t\tgames {\n\t\t\t\t\t...GameFragment\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n    \n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetUpcoming($date: Date!) {\n\t\tupcomingGames: games(\n\t\t\tfilters: { release_date: { gt: $date } }\n\t\t\tsort: \"release_date:asc\"\n\t\t\tpagination: { limit: 8 }\n\t\t) {\n\t\t\t...GameFragment\n\t\t}\n\n\t\tshowcase: home {\n\t\t\tupcomingGames {\n\t\t\t\ttitle\n\t\t\t\thighlight {\n\t\t\t\t\t...HighlightFragment\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t\n\t\n"): (typeof documents)["\n\tquery GetUpcoming($date: Date!) {\n\t\tupcomingGames: games(\n\t\t\tfilters: { release_date: { gt: $date } }\n\t\t\tsort: \"release_date:asc\"\n\t\t\tpagination: { limit: 8 }\n\t\t) {\n\t\t\t...GameFragment\n\t\t}\n\n\t\tshowcase: home {\n\t\t\tupcomingGames {\n\t\t\t\ttitle\n\t\t\t\thighlight {\n\t\t\t\t\t...HighlightFragment\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t\n\t\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetWishlist($documentId: ID!) {\n        wishlists(filters: { user: { documentId: { eq: $documentId } } }) {\n            id: documentId\n            games {\n                ...GameFragment\n            }  \n        }\n    }\n    \n    \n"): (typeof documents)["\n    query GetWishlist($documentId: ID!) {\n        wishlists(filters: { user: { documentId: { eq: $documentId } } }) {\n            id: documentId\n            games {\n                ...GameFragment\n            }  \n        }\n    }\n    \n    \n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;