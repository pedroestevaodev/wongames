import '@/.jest/next-auth-authenticated.mock';
import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import FormProfile from "@/components/FormProfile";

describe('<FormProfile />', () => {
    it('should render the profile form', () => {
        render(<FormProfile />);

        expect(
            screen.getByRole('heading', { name: /my profile/i })
        ).toBeInTheDocument();

        expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();

        expect(
            screen.getByRole('link', { name: /reset password/i })
        ).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    });
});