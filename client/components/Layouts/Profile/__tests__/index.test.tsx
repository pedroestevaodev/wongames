import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import Profile from "@/components/Layouts/Profile";

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
    useSearchParams: jest.fn(() => new URLSearchParams()),
    useRouter: jest.fn(() => ({
        push: jest.fn(),
    })),
}));

jest.mock('@/components/Layouts/Base', () => ({
    __esModule: true,
    default: function Mock({ children }: { children: React.ReactNode }) {
        return <div data-testid="Mock Base">{children}</div>
    },
}));

jest.mock('@/components/Heading', () => ({
    __esModule: true,
    default: function Mock() {
        return <div data-testid="Mock Heading"></div>
    },
}));

jest.mock('@/components/ProfileMenu', () => ({
    __esModule: true,
    default: function Mock() {
        return <div data-testid="Mock ProfileMenu"></div>
    },
}));


describe('<Profile />', () => {
    it('should render menu, footer and children', () => {
        render(
            <Profile>
                Lorem Ipsum
            </Profile>
        );

        expect(screen.getByText('Lorem Ipsum')).toBeInTheDocument();
        expect(screen.getByTestId('Mock Heading')).toBeInTheDocument();
        expect(screen.getByTestId('Mock ProfileMenu')).toBeInTheDocument();
    });
});