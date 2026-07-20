import { Meta, StoryObj } from '@storybook/react';
import Radio, { RadioProps } from '@/components/Radio';

export default {
	title: 'Form/Radio',
	component: Radio,
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'dark'
		}
	},
	argTypes: {
		onCheck: { action: 'checked' }
	}
} as Meta<RadioProps>;

export const Default: StoryObj<RadioProps> = {
	render: (args) => (
		<>
			<div style={{ padding: 10 }}>
				<Radio
					label="primeiro"
					labelFor="primeiro"
					id="primeiro"
					name="nome"
					value="primeiro"
					defaultChecked
					{...args}
				/>
			</div>
			<div style={{ padding: 10 }}>
				<Radio
					label="segundo"
					labelFor="segundo"
					id="segundo"
					name="nome"
					value="segundo"
					{...args}
				/>
			</div>
			<div style={{ padding: 10 }}>
				<Radio
					label="terceiro"
					labelFor="terceiro"
					id="terceiro"
					name="nome"
					value="terceiro"
					{...args}
				/>
			</div>
		</>
	)
};
