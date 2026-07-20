import { ItemProps } from '@/components/ExploreSidebar';
import { FilterObject, FilterValue } from "@/components/Layouts/Games";
import { ParsedUrlQueryInput } from 'querystring';

type ParseArgs = {
	queryString: ParsedUrlQueryInput;
	filterItems: Pick<ItemProps, 'type' | 'name'>[];
};

export const parseQueryStringToFilter = ({
	queryString,
	filterItems
}: ParseArgs) => {
	const obj: Record<string, string | string[]> = {};

	Object.keys(queryString).forEach((key) => {
		const item = filterItems?.find((item) => item.name === key);
		const isCheckbox = item?.type === 'checkbox';
		const queryValue = queryString[key];

		if (Array.isArray(queryValue)) {
			// Remove duplicatas do array
			obj[key] = Array.from(new Set(queryValue));
		} else if (typeof queryValue === 'string') {
			if (isCheckbox) {
				// Se for um checkbox, converte a string em array e remove duplicatas
				const values = queryValue.split(',').filter(Boolean); // Remove strings vazias
				obj[key] = Array.from(new Set(values));
			} else {
				// Se não for checkbox, mantém a string como está
				obj[key] = queryValue;
			}
		}
	});

	return obj;
};

export const parseQueryStringToObjFilter = (
	queryString: Record<string, string | string[]>,
	filterItems: ItemProps[]
): FilterObject => {
	const filters: FilterObject = {};

	filterItems.filter((item) => item.name !== 'sort').forEach((item) => {
		if (queryString[item.name]) {
			const queryValue = queryString[item.name];
			let filterValue: FilterValue | string | string[] | number;

			if (Array.isArray(queryValue)) {
				filterValue = queryValue;
			} else {
				// Check if the value is a number (used for price)
				filterValue = isNaN(Number(queryValue)) ? queryValue : Number(queryValue);

				if (item.type === 'checkbox' && typeof filterValue === 'string') {
					filterValue = filterValue.split(',').map(str => str.trim());
				}
			}

			filters[item.name] = item.value
				? item.filter
					? { [item.value]: { [item.filter]: filterValue } }
					: { [item.value]: filterValue }
				: item.filter
					? { [item.filter]: filterValue }
					: filterValue;
		}
	});

	return filters;
};