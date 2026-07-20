import '@/.jest/match-media.mock';
import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import Logo from "@/components/Logo";

describe('<Logo />', () => {
    it('should render the logo with id passed', () => {
        render(<Logo id="myId" />);
        const logoElement = screen.getByTestId('logo');
        expect(logoElement.querySelector('#paint_linear_myId')).toBeInTheDocument();
    });

    it('should render a white label by default', () => {
        render(<Logo />);
        expect(screen.getByLabelText(/Won Games/i).parentElement).toHaveStyle({
            color: '#FAFAFA'
        });
    });

    it('should render a black label when color is passed', () => {
        render(<Logo $color="black" />);
        expect(screen.getByLabelText(/Won Games/i).parentElement).toHaveStyle({
            color: '#030517'
        });
    });

    it('should render a normal logo when size is default', () => {
        render(<Logo />);
        expect(screen.getByLabelText(/Won Games/i).parentElement).toHaveStyle({
            width: '11rem'
        });
    });

    it('should render a bigger logo', () => {
        render(<Logo $size="large" />);
        expect(screen.getByLabelText(/Won Games/i).parentElement).toHaveStyle({
            width: '20rem'
        });
    });

    it('should render a bigger logo without text if hideOnMobile', () => {
        render(<Logo $hideOnMobile />);
        const logoElement = screen.getByLabelText(/Won Games/i).parentElement

        expect(logoElement).toBeInTheDocument()

        const styles = window.getComputedStyle(logoElement!)

        expect(styles.width).toBe('11rem')
    });
});