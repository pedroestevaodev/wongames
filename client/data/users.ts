import { GetProfileMeQuery } from "@/graphql/generated/graphql";
import { GET_PROFILE_ME } from "@/graphql/queries/profile";
import { getClient } from "@/lib/apolloClient";

export const getUserById = async (id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`);

        const user = await response.json();

        return user;
    } catch (error) {
        console.log("Error find user:", error);
        return null;
    }
};

export const getUser = async () => {
    try {
        const { data } = await getClient().query<GetProfileMeQuery>({
            query: GET_PROFILE_ME,
        });

        return data.me;
    } catch (error) {
        console.log("Error find user:", error);
        return null;
    }
};