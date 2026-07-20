import '@/.jest/server.mock';
import { render, screen, waitFor } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import FormResetPassword from "@/components/FormResetPassword";
import userEvent from "@testing-library/user-event";
import { useSearchParams } from "next/navigation";

jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(),
    useRouter: jest.fn(() => ({
        push: jest.fn(),
    })),
}));

(useSearchParams as jest.Mock).mockReturnValue(
    new URLSearchParams({ code: 'valid_code' })
);

describe('<FormResetPassword />', () => {
    it('should render the form', () => {
        render(<FormResetPassword />);

        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /reset password/i })
        ).toBeInTheDocument();
    });

    it('should show validation errors', async () => {
        render(<FormResetPassword />);

        await userEvent.type(screen.getByPlaceholderText('Password'), '12346');
        await userEvent.type(screen.getByPlaceholderText(/confirm/i), '32154');

        await userEvent.click(screen.getByRole('button', { name: /reset password/i }));

        expect(await screen.findByText(/passwords do not match/i));
    });

    it('should show error when code provided is wrong', async () => {
        (useSearchParams as jest.Mock).mockReturnValue(
            new URLSearchParams({ code: 'wrong_code' })
        );
        render(<FormResetPassword />);

        await userEvent.type(screen.getByPlaceholderText('Password'), '12345');
        await userEvent.type(screen.getByPlaceholderText(/confirm/i), '12345');

        await userEvent.click(screen.getByRole('button', { name: /reset password/i }));

        expect(
            await screen.findByText(/something went wrong/i)
        ).toBeInTheDocument();
    });

    it('should reset the password', async () => {
        (useSearchParams as jest.Mock).mockReturnValue(
            new URLSearchParams({ code: 'right_code' })
        );

        render(<FormResetPassword />);

        await userEvent.type(screen.getByPlaceholderText('Password'), '12345');
        await userEvent.type(screen.getByPlaceholderText(/confirm/i), '12345');

        await userEvent.click(screen.getByRole('button', { name: /reset password/i }));

        await waitFor(() => screen.findByText('Password reseted successfully'));
    });
});