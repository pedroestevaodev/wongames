import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import FormSignIn from "@/components/FormSignIn";
import { useRouter } from "next/navigation";

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    useSearchParams: jest.fn().mockReturnValue(new URLSearchParams('callbackUrl=/dashboard')),
}));

const push = jest.fn();

jest.mock('next-auth', () => ({
    useSession: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn(),
}));

beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
        push,
        query: '',
        asPath: '',
        route: '/'
    }));
});

describe('<FormSignIn />', () => {
    it('should render the form', () => {
        const { container } = render(<FormSignIn />);

        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /sign in now/i })
        ).toBeInTheDocument();

        expect(container.parentElement).toMatchSnapshot();
    });

    it('should render the forgot password link', () => {
        render(<FormSignIn />);

        expect(
            screen.getByRole('link', { name: /forgot your password\?/i })
        ).toBeInTheDocument();
    });

    it('should render text to sign up if doesn’t have an account', () => {
        render(<FormSignIn />);

        expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
        expect(screen.getByText(/don’t have an account\?/i)).toBeInTheDocument();
    });
});