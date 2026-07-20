import '@/.jest/server.mock';
import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import FormForgotPassword from "@/components/FormForgotPassword";
import userEvent from "@testing-library/user-event";
import { useSearchParams } from "next/navigation";

jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(() => new URLSearchParams()),
    useRouter: jest.fn(() => ({
        push: jest.fn(),
    })),
}));

describe('<FormForgotPassword />', () => {
    it('should render the form', () => {
        render(<FormForgotPassword />);

        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /send email/i })
        ).toBeInTheDocument();
    });

    it('should validate the email', async () => {
        render(<FormForgotPassword />);

        await userEvent.type(screen.getByPlaceholderText(/email/i), 'valid@email.com');

        await userEvent.click(screen.getByRole('button', { name: /send email/i }));

        expect(
            await screen.findByText(/email sent successfully/i)
        ).toBeInTheDocument();
    });

    it('should show an invalid email error', async () => {
        render(<FormForgotPassword />);

        await userEvent.type(screen.getByPlaceholderText(/email/i), 'invalid');

        await userEvent.click(screen.getByRole('button', { name: /send email/i }));

        expect(
            await screen.findByText(/inválid email/i)
        ).toBeInTheDocument();
    });

    it('should show an inexistent email error', async () => {
        render(<FormForgotPassword />);

        await userEvent.type(screen.getByPlaceholderText(/email/i), 'false@email.com');

        await userEvent.click(screen.getByRole('button', { name: /send email/i }));

        expect(
            await screen.findByText(/something went wrong/i)
        ).toBeInTheDocument();
    });

    it('should autofill if comes via logged user', () => {
        (useSearchParams as jest.Mock).mockImplementation(() => new URLSearchParams({ email: 'valid@email.com' }));

        render(<FormForgotPassword />);

        expect(screen.getByPlaceholderText(/email/i)).toHaveValue('valid@email.com');
    });
});