import '@/.jest/apollo-experimental-nextjs.mock';
import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import FormSignUp from "@/components/FormSignUp";
import { useRouter } from "next/navigation";
import { MockedProvider } from "@apollo/client/testing";

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

describe('<FormSignUp />', () => {
    it('should render the form', () => {
        const { container } = render(
            <MockedProvider>
                <FormSignUp />
            </MockedProvider>
        );

        expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /sign up now/i })
        ).toBeInTheDocument();

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render text and link to sign in', () => {
        render(
            <MockedProvider>
                <FormSignUp />
            </MockedProvider>
        );

        expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
        expect(screen.getByText(/already have an account\?/i)).toBeInTheDocument();
    });
});