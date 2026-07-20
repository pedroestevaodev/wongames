import { Meta, StoryObj } from '@storybook/react';
import TextField, { TextFieldProps } from '@/components/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { fn } from "@storybook/test";

export default {
	title: 'Form/TextField',
	component: TextField,
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'light'
		}
	},
	argTypes: {
		onInput: { action: 'changed' }
	},
	args: {
		label: 'E-mail',
		name: 'email',
		icon: <FontAwesomeIcon icon={faEnvelope} />,
		initialValue: '',
		placeholder: 'john.cage@gmail.com',
		disabled: false,
		onClick: fn()
	},
	decorators: [
		(Story) => (
			<div style={{ maxWidth: 300, padding: 15 }}>
				<Story />
			</div>
		)
	]
} as Meta<TextFieldProps>;

export const Default: StoryObj<TextFieldProps> = {};

export const WithError: StoryObj<TextFieldProps> = {
	args: {
		error: 'Ops... something is wrong'
	}
};
