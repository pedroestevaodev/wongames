import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import NextProgressbar from "@/components/NextProgressbar";

jest.mock('next-nprogress-bar', () => ({
	AppProgressBar: jest.fn(() => <div data-testid="progress-bar" />),
}));

describe('<NextProgressbar />', () => {
	it('should render the progress bar component', () => {
		render(<NextProgressbar />);

		expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
	});
});