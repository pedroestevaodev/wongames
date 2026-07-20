import { fireEvent, render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

describe('<Button />', () => {
    it('should render the medium size by default', () => {
        const { container } = render(<Button>Buy now</Button>);

        expect(screen.getByRole('button', { name: /Buy now/i })).toHaveStyle({
            height: '4rem',
            padding: '0.8rem 3.2rem',
            'font-size': '1.4rem'
        });

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render the small size', () => {
        render(<Button size="small">Buy now</Button>);

        expect(screen.getByRole('button', { name: /Buy now/i })).toHaveStyle({
            height: '3rem',
            'font-size': '1.2rem'
        });
    });

    it('should render the large size', () => {
        render(<Button size="large">Buy now</Button>);

        expect(screen.getByRole('button', { name: /Buy now/i })).toHaveStyle({
            height: '5rem',
            'font-size': '1.6rem',
            padding: '0.8rem 4.8rem'
        });
    });

    it('should render a fullWidth version', () => {
        render(<Button fullWidth>Buy now</Button>);

        expect(screen.getByRole('button', { name: /Buy now/i })).toHaveStyle({
            width: '100%'
        });
    });

    it('should render an icon version', () => {
        render(
            <Button icon={<FontAwesomeIcon icon={faCartShopping} data-testid="icon" />}>Buy now</Button>
        );

        expect(screen.getByText(/buy now/i)).toBeInTheDocument();
        expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('should render a minimal version', () => {
        render(
            <Button icon={<FontAwesomeIcon icon={faCartShopping} data-testid="icon" />} minimal>
                Buy now
            </Button>
        );

        const button = screen.getByRole('button', { name: /buy now/i });

        expect(button).toHaveStyle({
            background: 'none',
            color: 'rgb(226, 14, 141)'
        });

        fireEvent.mouseOver(button);

        expect(getComputedStyle(button).background).toBe('none');
    });

    it('should render a disabled Button', () => {
        render(<Button disabled>Buy now</Button>);

        const button = screen.getByRole('button', { name: /buy now/i });

        expect(button).toBeDisabled();

        expect(getComputedStyle(button).cursor).toBe('not-allowed');
    });

    it('should render Button as a link', () => {
        render(
            <Button as="a" href="/link">
                Buy now
            </Button>
        );

        expect(screen.getByRole('link', { name: /buy now/i })).toHaveAttribute(
            'href',
            '/link'
        );
    });
});