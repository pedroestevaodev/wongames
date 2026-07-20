import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import TextContent from "@/components/TextContent";

const props = {
	title: 'Description',
	content: `<h1>Content</h1>`
};

describe('<TextContent />', () => {
	it('should render the title and content', () => {
		render(<TextContent {...props} />);

		expect(
			screen.getByRole('heading', { name: /description/i })
		).toBeInTheDocument();

		expect(screen.getByText('Content')).toBeInTheDocument();
	});

	it('should render without title', () => {
		render(<TextContent content={props.content} />);

		expect(
			screen.queryByRole('heading', { name: /description/i })
		).not.toBeInTheDocument();
	});

	it('should apply correct styles', () => {
		render(<TextContent {...props} />);

		const wrapper = screen.getByRole('heading', { name: /description/i }).parentElement;

		expect(wrapper).toBeInTheDocument();
		expect(getComputedStyle(wrapper!).color).toBe('rgb(250, 250, 250)');
	});
});