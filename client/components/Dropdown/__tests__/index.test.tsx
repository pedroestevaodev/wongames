import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import userEvent from '@testing-library/user-event';
import Dropdown from "@/components/Dropdown";

describe('<Dropdown />', () => {
    it('should render title', () => {
        const title = <h1 aria-label="toogle dropdown">Click here</h1>;

        render(
            <Dropdown title={title}>
                <span>content</span>
            </Dropdown>
        );
        expect(screen.getByLabelText(/toogle dropdown/)).toBeInTheDocument();
    });

    it('should handle open/close dropdown', async () => {
        render(
            <Dropdown title="Toggle Dropdown">
                <div>Content</div>
            </Dropdown>
        );

        // eslint-disable-next-line testing-library/no-node-access
        const content = screen.getByText(/content/i).parentElement!;
        expect(content).toHaveStyle({ opacity: '0' });
        expect(content).toHaveAttribute('aria-hidden', 'true');

        await userEvent.click(screen.getByText(/toggle dropdown/i));

        expect(content).toHaveStyle({ opacity: '1' });
        expect(content).toHaveAttribute('aria-hidden', 'false');
    });

    it('should handle open/close dropdown when clicking on overlay', async () => {
        render(
            <Dropdown title="Toggle Dropdown">
                <div>Content</div>
            </Dropdown>
        );

        // eslint-disable-next-line testing-library/no-node-access
        const content = screen.getByText(/content/i).parentElement!;
        // eslint-disable-next-line testing-library/no-node-access
        const overlay = content.nextElementSibling;

        await userEvent.click(screen.getByText(/toggle dropdown/i));

        expect(overlay).toHaveStyle({ opacity: 1 });
        expect(overlay).toHaveAttribute('aria-hidden', 'false');

        await userEvent.click(overlay!);

        expect(overlay).toHaveStyle({ opacity: 0 });
        expect(overlay).toHaveAttribute('aria-hidden', 'true');
    });
});