import '@/.jest/match-media.mock';
import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import Heading from "@/components/Heading";

describe('<Heading />', () => {
	it('should render a white heading by default', () => {
		render(<Heading>Won Games</Heading>);
		expect(screen.getByRole('heading', { name: /won games/i })).toHaveStyle({
			color: '#FAFAFA'
		});
	});

	it('should render a black heading when color is passed', () => {
		render(<Heading color="black">Won Games</Heading>);
		expect(screen.getByRole('heading', { name: /won games/i })).toHaveStyle({
			color: '#030517'
		});
	});

	it('should render a heading with a line to the left side', () => {
		render(<Heading lineLeft>Won Games</Heading>);
		expect(screen.getByRole('heading', { name: /won games/i })).toHaveStyle({
			'border-left': '0.7rem solid #F231A5'
		});
	});

	it('should render a heading with a huge size', () => {
		render(<Heading size="huge">Won Games</Heading>);

		expect(screen.getByRole('heading', { name: /won games/i })).toHaveStyle({
			'font-size': '5.2rem'
		});
	});
});