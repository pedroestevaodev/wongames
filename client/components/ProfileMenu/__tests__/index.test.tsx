import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import ProfileMenu from "@/components/ProfileMenu";
import { theme } from "@/public/styles/theme";
import { usePathname, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
    useSearchParams: jest.fn(),
}));

(usePathname as jest.Mock).mockReturnValue('/');
(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(''));

describe('<ProfileMenu />', () => {
    it('should render the menu', () => {
        const { container } = render(<ProfileMenu />);

        expect(
            screen.getByRole('link', { name: /my profile/i })
        ).toBeInTheDocument();

        expect(screen.getByRole('link', { name: /my orders/i })).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /sign out/i })
        ).toBeInTheDocument();

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render the menu with an active link defined', () => {
        render(<ProfileMenu activeLink="/profile/orders" />);

        expect(screen.getByRole('link', { name: /my orders/i })).toHaveStyle({
            background: theme.colors.primary,
            color: theme.colors.white
        });
    });
});