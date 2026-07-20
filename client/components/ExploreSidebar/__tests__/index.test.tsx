import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import ExploreSidebar from "@/components/ExploreSidebar";
import exploreSidebarMock from "../mocks/mock";
import userEvent from "@testing-library/user-event";

describe('<ExploreSidebar />', () => {
	it('should render headings', () => {
		render(<ExploreSidebar items={exploreSidebarMock} onFilter={jest.fn} />);

		expect(screen.getByRole('heading', { name: /price/i })).toBeInTheDocument();
		expect(
			screen.getByRole('heading', { name: /sort by/i })
		).toBeInTheDocument();
		expect(
			screen.getByRole('heading', { name: /platforms/i })
		).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /categories/i })).toBeInTheDocument();
	});

	it('should render inputs', () => {
		render(<ExploreSidebar items={exploreSidebarMock} onFilter={jest.fn} />);

		expect(
			screen.getByRole('checkbox', { name: /under \$50/i })
		).toBeInTheDocument();

		expect(
			screen.getByRole('radio', { name: /low to high/i })
		).toBeInTheDocument();
	});

	it('should render the filter button', () => {
		render(<ExploreSidebar items={exploreSidebarMock} onFilter={jest.fn} />);

		expect(screen.getByRole('button', { name: /filter/i })).toBeInTheDocument();
	});

	it('should check initial values that are passed', () => {
		render(
			<ExploreSidebar
				items={exploreSidebarMock}
				onFilter={jest.fn}
				initialValues={{ platforms: ['windows'], sort_by: 'low-to-high' }}
			/>
		);

		expect(screen.getByRole('checkbox', { name: /windows/i })).toBeChecked();

		expect(screen.getByRole('radio', { name: /low to high/i })).toBeChecked();
	});

	it('should filter with initial values', () => {
		const onFilter = jest.fn();

		render(
			<ExploreSidebar
				items={exploreSidebarMock}
				initialValues={{ platforms: ['windows'], sort_by: 'low-to-high' }}
				onFilter={onFilter}
			/>
		);

		expect(onFilter).toBeCalledWith({
			platforms: ['windows'],
			sort_by: 'low-to-high'
		});
	});

	it('should filter with checked values', async () => {
		const onFilter = jest.fn();

		render(<ExploreSidebar items={exploreSidebarMock} onFilter={onFilter} />);

		await userEvent.click(screen.getByLabelText(/windows/i));
		await userEvent.click(screen.getByLabelText(/linux/i));
		await userEvent.click(screen.getByLabelText(/low to high/i));

		expect(onFilter).toHaveBeenCalledTimes(4);

		expect(onFilter).toBeCalledWith({
			platforms: ['windows', 'linux'],
			sort_by: 'low-to-high'
		});
	});

	it('should altern between radio options', async () => {
		const onFilter = jest.fn();

		render(<ExploreSidebar items={exploreSidebarMock} onFilter={onFilter} />);

		await userEvent.click(screen.getByLabelText(/low to high/i));
		await userEvent.click(screen.getByLabelText(/high to low/i));

		expect(onFilter).toBeCalledWith({ sort_by: 'high-to-low' });
	});
});