import { render, screen, waitFor } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import TextField from "@/components/TextField";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import userEvent from "@testing-library/user-event";

describe('<TextField />', () => {
    it('Renders with Label', () => {
        render(<TextField label="Label" name="Label" />);

        expect(screen.getByLabelText('Label')).toBeInTheDocument();
    });

    it('Renders without Label', () => {
        render(<TextField />);

        expect(screen.queryByLabelText('Label')).not.toBeInTheDocument();
    });

    it('Renders with placeholder', () => {
        render(<TextField placeholder="hey you" />);

        expect(screen.getByPlaceholderText('hey you')).toBeInTheDocument();
    });

    it('Renders with Icon', () => {
        render(<TextField icon={<FontAwesomeIcon icon={faEnvelope} data-testid="icon" />} />);

        expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('Renders with Icon on the right side', () => {
        render(
            <TextField icon={<FontAwesomeIcon icon={faEnvelope} data-testid="icon" />} iconPosition="right" />
        );

        // eslint-disable-next-line testing-library/no-node-access
        expect(screen.getByTestId('icon').parentElement).toHaveStyle({ order: 1 });
    });

    it('Changes its value when typing', async () => {
        const onInputChange = jest.fn();
        render(
            <TextField
                onInputChange={onInputChange}
                label="TextField"
                name="TextField"
            />
        );

        const input = screen.getByRole('textbox');
        const text = 'This is my new text';
        await userEvent.type(input, text);

        await waitFor(() => expect(input).toHaveValue(text));
        await waitFor(() => expect(onInputChange).toHaveBeenCalledTimes(text.length));
        expect(onInputChange).toHaveBeenCalledWith(text);
    });

    it('Does not changes its value when disabled', async () => {
        const onInputChange = jest.fn();
        render(
            <TextField
                onInputChange={onInputChange}
                label="TextField"
                name="TextField"
                disabled
            />
        );

        const input = screen.getByRole('textbox');
        expect(input).toBeDisabled();

        const text = 'This is my new text';
        await userEvent.type(input, text);

        await waitFor(() => {
            expect(input).not.toHaveValue(text)
        });
        expect(onInputChange).not.toHaveBeenCalled();
    });

    it('Renders with error', () => {
        const { container } = render(
            <TextField
                icon={<FontAwesomeIcon icon={faEnvelope} data-testid="icon" />}
                label="TextField"
                error="Error message"
            />
        );
        const { firstChild } = container;

        expect(screen.getByText('Error message')).toBeInTheDocument();

        expect(firstChild).toMatchSnapshot();
    });

    it('Is accessible by tab', async () => {
        render(<TextField label="TextField" name="TextField" />);

        const input = screen.getByLabelText('TextField');
        expect(document.body).toHaveFocus();

        await userEvent.tab();
        expect(input).toHaveFocus();
    });

    it('Is not accessible by tab when disabled', async () => {
        render(<TextField label="TextField" name="TextField" disabled />);

        const input = screen.getByLabelText('TextField');
        expect(document.body).toHaveFocus();

        await userEvent.tab();
        expect(input).not.toHaveFocus();
    });
});