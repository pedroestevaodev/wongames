import { ItemProps } from "@/components/ExploreSidebar";
import { GetCategoriesQuery, GetCategoriesQueryVariables, GetPlatformsQuery, GetPlatformsQueryVariables } from "@/graphql/generated/graphql";
import { GET_CATEGORIES } from "@/graphql/queries/categories";
import { GET_PLATFORMS } from "@/graphql/queries/platforms";
import { getClient } from "@/lib/apolloClient";

const filterPrices: ItemProps = {
    title: 'Price',
    name: 'price',
    type: 'radio',
    filter: 'lte',
    fields: [
        { label: 'Free', name: '0' },
        { label: 'Under $50', name: '50' },
        { label: 'Under $100', name: '100' },
        { label: 'Under $150', name: '150' },
        { label: 'Under $250', name: '250' },
        { label: 'Under $500', name: '500' }
    ]
};

const filterSort: ItemProps = {
    title: 'Sort by price',
    name: 'sort',
    type: 'radio',
    fields: [
        { label: 'Lowest to highest', name: 'price:asc,name:asc' },
        { label: 'Highest to lowest', name: 'price:desc,name:asc' }
    ]
};

const filterPlatforms = async () => {
    const { data: dataPlatforms, error: errorPlatforms } = await getClient().query<GetPlatformsQuery, GetPlatformsQueryVariables>({
		query: GET_PLATFORMS,
		variables: { limit: 50, start: 0, sort: "name:asc" },
		context: {
			fetchOptions: {
				next: { revalidate: 60 }
			}
		}
	});

    if (errorPlatforms) return [];

    const platforms = dataPlatforms.platforms.map((platform) => ({
        label: platform?.name,
        name: platform?.slug,
    }));

    return {
        title: 'Platforms',
        name: 'platforms',
        type: 'checkbox',
        value: 'slug',
        filter: 'in',
        fields: platforms
    } as ItemProps;
};

const filterCategories = async () => {
    const { data: dataCategories, error: errorCategories } = await getClient().query<GetCategoriesQuery, GetCategoriesQueryVariables>({
		query: GET_CATEGORIES,
		variables: { limit: 50, start: 0, sort: "name:asc" },
		context: {
			fetchOptions: {
				next: { revalidate: 60 }
			}
		}
	});

    if (errorCategories) return [];

    const categories = dataCategories.categories.map((category) => ({
        label: category?.name,
        name:category?.slug,
    }));

    return {
        title: 'Categories',
        name: 'categories',
        type: 'checkbox',
        value: 'slug',
        filter: 'in',
        fields: categories
    } as ItemProps;
};

export const getFilterItems = async () => {
    const platforms = await filterPlatforms();
    const categories = await filterCategories();

    return [
        filterSort,
        filterPrices,
        platforms,
        categories
    ] as ItemProps[];
};
