import React from 'react';
import Profile from '@/components/Layouts/Profile';
import OrdersList from '@/components/OrdersList';
import { GetOrdersQuery, GetOrdersQueryVariables } from "@/graphql/generated/graphql";
import { getClient } from "@/lib/apolloClient";
import { GET_ORDERS } from "@/graphql/queries/orders";
import { auth } from "@/services/auth";
import { OrdersFragmentFragment } from "@/@types/graphql-extended";
import { ordersMapper } from "@/utils/mappers";

const ProfileOrdersPage = async () => {
	const session = await auth();

	const { data } = await getClient().query<GetOrdersQuery, GetOrdersQueryVariables>({
		query: GET_ORDERS,
		variables: {
			identifier: session?.user.id as string,
		},
		context: {
			fetchOptions: {
				next: { revalidate: 60 }
			}
		},
	});

	if (!data) return null;

	return (
		<Profile>
			<OrdersList items={ordersMapper(data.orders as OrdersFragmentFragment[])} />
		</Profile>
	);
};

export default ProfileOrdersPage;
