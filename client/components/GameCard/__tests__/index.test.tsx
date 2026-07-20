import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import GameCard, { GameCardProps } from "@/components/GameCard";
import { theme } from "@/public/styles/theme";

const props: GameCardProps = {
    id: '1',
    slug: 'population-zero',
    title: 'Population Zero',
    developer: 'Rockstar Games',
    img: 'https://images.unsplash.com/photo-1674461315270-d6b04eaff631',
    price: 235
};

describe('<GameCard />', () => {
    it('should render correctly', () => {
        const { container } = render(<GameCard {...props} />);

        expect(
            screen.getByRole('heading', { name: props.title })
        ).toBeInTheDocument();

        expect(
            screen.getByRole('heading', { name: props.developer })
        ).toBeInTheDocument();

        const image = screen.getByRole('img', { name: props.title });

        expect(image).toHaveAttribute('src');
        expect(image).toHaveAttribute('src', expect.stringContaining(encodeURIComponent(props.img)));

        expect(screen.getByRole('link')).toHaveAttribute('href', `/game/${props.slug}`);
        expect(screen.getByText(props.title)).toBeInTheDocument();

        expect(screen.getByLabelText(/add to wishlist/i)).toBeInTheDocument();

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render price in label', () => {
        render(<GameCard {...props} />);

        const price = screen.getByText('$235.00');

        expect(price).not.toHaveStyle({ textDecoration: 'line-through' });
        expect(price).toHaveStyle({ backgroundColor: theme.colors.secondary });
    })

    it('should render a line-through in price when promotional', () => {
        render(<GameCard {...props} promotionalPrice={15} />);

        expect(screen.getByText('$235.00')).toHaveStyle({
            textDecoration: 'line-through'
        });

        expect(screen.getByText('$15.00')).not.toHaveStyle({
            textDecoration: 'line-through'
        });
    });

    it('should render Ribbon', () => {
        render(
            <GameCard
                {...props}
                ribbon="My Ribbon"
                ribbonColor="secondary"
                ribbonSize="small"
            />
        );
        const ribbon = screen.getByText(/my ribbon/i);

        expect(ribbon).toHaveStyle({ backgroundColor: '#3CD3C1' });
        expect(ribbon).toHaveStyle({ height: '2.6rem', fontSize: '1.2rem' });
        expect(ribbon).toBeInTheDocument();
    });
});