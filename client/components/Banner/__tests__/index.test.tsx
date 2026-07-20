import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import Banner from "@/components/Banner";

const props = {
    img: 'https://images.unsplash.com/photo-1674461315270-d6b04eaff631',
    title: 'Defy death',
    subTitle: '<p>Play the new <strong>CrashLands</strong> season</p>',
    buttonLabel: 'Buy now',
    buttonLink: '/games/defy-death',
};

describe('<Banner />', () => {
    it('should render correctly', () => {
        const { container } = render(<Banner {...props} />);
        const { firstChild } = container;

        expect(screen.getByRole('heading', { name: /Defy death/i })).toBeInTheDocument();

        expect(screen.getByRole('heading', { name: /Play the new CrashLands season/i })).toBeInTheDocument();

        expect(screen.getByRole('img', { name: /Defy death/i })).toBeInTheDocument();

        expect(firstChild).toMatchSnapshot();
    });

    it('should render a Ribbon', () => {
        render(
            <Banner
                {...props}
                ribbon="20% OFF"
                ribbonSize="small"
                ribbonColor="secondary"
            />
        );

        const ribbon = screen.getByText(/20% OFF/i);

        expect(ribbon).toBeInTheDocument();
        expect(ribbon).toHaveStyle({ backgroundColor: '#3CD3C1' });
        expect(ribbon).toHaveStyle({ height: '2.6rem', fontSize: '1.2rem' });
    });
});