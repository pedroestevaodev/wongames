import '@/.jest/next-auth-authenticated.mock';
import { fireEvent, render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import { usePathname, useSearchParams } from 'next/navigation';
import Menu from "@/components/Menu";

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
    useSearchParams: jest.fn(),
}));

(usePathname as jest.Mock).mockReturnValue('/');
(useSearchParams as jest.Mock).mockReturnValue({
    get: jest.fn(() => null),
});

describe('<Menu />', () => {
    it('should render the menu', () => {
        render(<Menu />);

        expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument();
        expect(screen.getByRole('img', { name: /won games/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
        expect(screen.getAllByLabelText(/shopping cart/i)).toHaveLength(2);
    });

    it('should handle the open/close mobile menu', () => {
        render(<Menu />);

        const fullMenuElement = screen.getByRole('navigation', { hidden: true });

        expect(fullMenuElement).toHaveAttribute('aria-hidden', 'true');
        expect(fullMenuElement).toHaveStyle({ opacity: 0 });

        fireEvent.click(screen.getByLabelText(/open menu/i));
        expect(fullMenuElement).toHaveAttribute('aria-hidden', 'false');
        expect(fullMenuElement).toHaveStyle({ opacity: 1 });

        fireEvent.click(screen.getByLabelText(/close menu/i));
        expect(fullMenuElement).toHaveAttribute('aria-hidden', 'true');
        expect(fullMenuElement).toHaveStyle({ opacity: 0 });
    });

    it('should show register box when logged out', () => {
        render(<Menu />);

        expect(screen.queryByText(/my profile/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/wishlist/i)).not.toBeInTheDocument();
        expect(screen.getByText(/sign up/i)).toBeInTheDocument();
        expect(screen.getAllByText(/sign in/i)).toHaveLength(2);
    });

    it('should show wishlist and account when logged in', () => {
        render(<Menu username="will" />);

        expect(screen.getAllByText(/my account/i)).toHaveLength(1);
        expect(screen.getAllByText(/wishlist/i)).toHaveLength(2);
        expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/sign up/i)).not.toBeInTheDocument();
    });

    it('should not show sign in or dropdownUser if loading', () => {
        render(<Menu username="will" loading />);

        expect(screen.queryByText(/my profile/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
    });
});