'use client';

import React from "react";
import {
	ApolloLink,
	HttpLink,
} from "@apollo/client";
import {
	ApolloNextAppProvider,
	NextSSRApolloClient,
	NextSSRInMemoryCache,
	SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { concatPagination } from "@apollo/client/utilities";
import { setContext } from '@apollo/client/link/context';
import { getSession } from "next-auth/react";

const makeClient = () => {
	const httpLink = new HttpLink({
		uri: process.env.NEXT_PUBLIC_GRAPHQL_SCHEMA,
		fetchOptions: { cache: 'no-store' }
	});

	const authLink = setContext(async (_, { headers, session: clientSession }) => {
		const session = await getSession();
		const jwt = session?.user.jwt || clientSession?.jwt || '';
		const authorization = jwt ? `Bearer ${jwt}` : '';

		return { headers: { ...headers, authorization } };
	});

	return new NextSSRApolloClient({
		cache: new NextSSRInMemoryCache({
			typePolicies: {
				Query: {
					fields: {
						games: concatPagination(['filters', 'sort']),
					},
				},
				Wishlist: {
					fields: {
						games: {
							merge(_, incoming) {
								return incoming;
							},
						},
					},
				},
			},
		}),
		link:
			typeof window === 'undefined'
				? ApolloLink.from([
					new SSRMultipartLink({
						stripDefer: true
					}),
					authLink.concat(httpLink),
				])
				: authLink.concat(httpLink),
	});
};

const ApolloProviderWrapper = ({
	children
}: React.PropsWithChildren) => {
	return (
		<ApolloNextAppProvider makeClient={makeClient}>
			{children}
		</ApolloNextAppProvider>
	);
};

export default ApolloProviderWrapper;