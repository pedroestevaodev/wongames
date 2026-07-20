import { render } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import Grid from "@/components/Grid";

describe('<Grid />', () => {
	it('should render the heading', () => {
		const { container } = render(
			<Grid>
				Children
			</Grid>
		);

		expect(container.firstChild).toMatchInlineSnapshot(`
.c0 {
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(25rem,1fr));
  gap: 3.2rem;
  margin: 3.2rem 0;
}

<div
  class="c0"
>
  Children
</div>
`);
	});
});