import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import Highlight from "@/components/Highlight";

const props = {
	title: 'Heading 1',
	subTitle: 'Heading 2',
	backgroundImage: '/img/red-dead-img.jpg',
	buttonLabel: 'Buy now',
	buttonLink: '/rdr2'
};

describe('<Highlight />', () => {
	it('should render headings and button', () => {
		const { container } = render(<Highlight {...props} />);

		expect(
			screen.getByRole('heading', { name: /heading 1/i })
		).toBeInTheDocument();

		expect(
			screen.getByRole('heading', { name: /heading 2/i })
		).toBeInTheDocument();

		expect(screen.getByRole('link', { name: /buy now/i })).toBeInTheDocument();

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render background image', () => {
		render(<Highlight {...props} />);

		expect(
			screen.getByRole('img', { name: `${props.title} background` })
		).toHaveAttribute('src', expect.stringContaining(encodeURIComponent(props.backgroundImage)));
	});

	it('should render float image', () => {
		render(<Highlight {...props} floatImage="/float-image.png" />);

		expect(screen.getByRole('img', { name: props.title })).toHaveAttribute(
			'src',
			expect.stringContaining(encodeURIComponent('/float-image.png'))
		);
	});
});
