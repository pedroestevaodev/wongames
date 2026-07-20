import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { setContext } from '@apollo/client/link/context';
import { auth } from "@/services/auth";

export const { getClient } = registerApolloClient(() => {
	const httpLink = new HttpLink({
		uri: process.env.NEXT_PUBLIC_GRAPHQL_SCHEMA,
	});

	const authLink = setContext(async (_, { headers, session: clientSession }) => {
		const session = await auth();
		const jwt = session?.user.jwt || clientSession?.jwt || '';
		const authorization = jwt ? `Bearer ${jwt}` : '';

		return { headers: { ...headers, authorization } };
	});

	return new ApolloClient({
		cache: new InMemoryCache(),
		link: authLink.concat(httpLink),
	});
});
