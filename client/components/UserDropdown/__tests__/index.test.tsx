import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import { usePathname, useSearchParams } from 'next/navigation'
import UserDropdown from "@/components/UserDropdown";
import userEvent from "@testing-library/user-event";

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
    useSearchParams: jest.fn(),
}));

(usePathname as jest.Mock).mockReturnValue('/');
(useSearchParams as jest.Mock).mockReturnValue({
    get: jest.fn(() => null),
});

describe('<UserDropdown />', () => {
    it('should render the username', () => {
        render(<UserDropdown username="Willian" />);

        expect(screen.getByText(/willian/i)).toBeInTheDocument();
    });

    it('should render the menu', async () => {
        render(<UserDropdown username="Willian" />);

        // open menu
        await userEvent.click(screen.getByText(/willian/i));

        expect(
            screen.getByRole('link', { name: /my profile/i })
        ).toBeInTheDocument();

        expect(screen.getByRole('link', { name: /wishlist/i })).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /sign out/i })
        ).toBeInTheDocument();
    });
});