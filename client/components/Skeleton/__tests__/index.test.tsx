import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import SkeletonContainer from "@/components/Skeleton";

describe('<SkeletonContainer />', () => {
	it('should render the correct number of elements when numberOfElements is provided', () => {
		const numberOfElements = 3;
		render(
			<SkeletonContainer numberOfElements={numberOfElements}>
				<div>Test</div>
			</SkeletonContainer>
		);

		const elements = screen.getAllByText('Test');
		expect(elements).toHaveLength(numberOfElements);
	});

	it('should render one element by default if numberOfElements is not provided or is less than 1', () => {
		render(
			<SkeletonContainer>
				<div>Test</div>
			</SkeletonContainer>
		);

		const elements = screen.getAllByText('Test');
		expect(elements).toHaveLength(1);
	});

	it('should render the children correctly', () => {
		render(
			<SkeletonContainer numberOfElements={2}>
				<div>Child Element</div>
			</SkeletonContainer>
		);

		const elements = screen.getAllByText('Child Element');
		expect(elements).toHaveLength(2);
	});

	it('should render children for each element when numberOfElements is greater than 1', () => {
		render(
			<SkeletonContainer numberOfElements={3}>
				<div>Test Child</div>
			</SkeletonContainer>
		);

		const elements = screen.getAllByText('Test Child');
		expect(elements).toHaveLength(3);
	});
});