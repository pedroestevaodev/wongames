'use client';

import React, { useEffect, useState } from 'react';
import * as S from './styles';
import xor from "lodash.xor";
import { RiCloseLine, RiFilter2Line } from '@remixicon/react';
import Heading from '../Heading';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
import Button from '../Button';
import { ParsedUrlQueryInput } from "querystring";

type FieldProps = {
	label: string;
	name: string;
};

export type ItemProps = {
	title: string;
	name: string;
	type: string;
	value?: string;
	filter?: string;
	fields: FieldProps[];
};

type Values = ParsedUrlQueryInput;

export type ExploreSidebarProps = {
	items: ItemProps[];
	onFilter: (values: Values) => void;
	initialValues?: Values;
};

const ExploreSidebar = ({
	items,
	onFilter,
	initialValues = {},
}: ExploreSidebarProps) => {
	const [values, setValues] = useState<Values>(initialValues);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		onFilter(values);
		// this method comes from another template
		// that we don't have access
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values]);

	const handleRadio = (name: string, value: string | boolean) => {
		setValues((s) => ({ ...s, [name]: value }));
	};

	const handleCheckbox = (name: string, value: string) => {
		const currentList = (values[name] as []) || [];
		setValues((s) => ({ ...s, [name]: xor(currentList, [value]) }));
	};

	const handleFilterMenu = () => {
		setIsOpen(false);
	};

	return (
		<S.ExploreSidebarContainer $isOpen={isOpen}>
			<S.Overlay aria-hidden={isOpen} />
			<S.IconContainer>
				<RiFilter2Line
					aria-label="open filters"
					onClick={() => setIsOpen(true)}
				/>
				<RiCloseLine
					aria-label="close filters"
					onClick={() => setIsOpen(false)}
				/>
			</S.IconContainer>

			<S.Content>
				{items.map((item) => (
					<S.Items key={item.title}>
						<Heading lineBottom lineColor="secondary" size="small">
							{item.title}
						</Heading>

						{item.type === 'checkbox' &&
							item.fields.map((field) => (
								<Checkbox
									key={field.name}
									id={field.name}
									name={field.name}
									label={field.label}
									labelFor={field.name}
									isChecked={values[item.name]?.toString().includes(field.name)}
									onCheck={() => handleCheckbox(item.name, field.name)}
								/>
							))}

						{item.type === 'radio' &&
							item.fields.map((field) => (
								<Radio
									key={field.name}
									id={field.name}
									name={field.name}
									value={field.name}
									label={field.label}
									labelFor={field.name}
									checked={String(field.name) === String(values[item.name])}
									onChange={() => handleRadio(item.name, field.name)}
								/>
							))}
					</S.Items>
				))}
			</S.Content>

			<S.Footer>
				<Button fullWidth size="medium" onClick={handleFilterMenu}>
					Filter
				</Button>
			</S.Footer>
		</S.ExploreSidebarContainer>
	);
};

export default ExploreSidebar;
