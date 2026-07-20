import { Meta, StoryObj } from '@storybook/react';
import PaymentForm, { PaymentFormProps } from '@/components/PaymentForm';

export default {
	title: 'Page/PaymentForm',
	component: PaymentForm,
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'dark'
		}
	}
} as Meta<PaymentFormProps>;

export const Default: StoryObj<PaymentFormProps> = {};
