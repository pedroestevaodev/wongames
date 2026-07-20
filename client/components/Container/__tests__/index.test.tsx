import { render } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import Container from "@/components/Container";
import { theme } from "@/public/styles/theme";

describe('<Container />', () => {
    it('should render the heading', () => {
        const { container } = render(
            <Container>
                <span>Won Games</span>
            </Container>
        )

        const firstChild = container.firstChild as HTMLElement;
        expect(window.getComputedStyle(firstChild).maxWidth).toBe(theme.grid.container);

        expect(container.firstChild).toMatchInlineSnapshot(`
        .c0 {
          width: 100%;
          max-width: 130rem;
          margin-left: auto;
          margin-right: auto;
          padding-left: calc(3.2rem / 2);
          padding-right: calc(3.2rem / 2);
        }

        <div
          class="c0"
        >
          <span>
            Won Games
          </span>
        </div>
        `);
    });
});