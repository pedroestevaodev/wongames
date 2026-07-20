import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import Footer from "@/components/Footer";

describe('<Footer />', () => {
	it('should render 4 column topics', () => {
		const { container } = render(<Footer />);

		expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /follow us/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /links/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /location/i })).toBeInTheDocument();

		expect(container.firstChild).toMatchSnapshot();
	});
});