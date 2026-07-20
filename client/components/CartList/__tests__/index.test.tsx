import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import CartList from "@/components/CartList";
import { CartContextDefaultValues } from "@/hooks/useCart";
import cartListMock from "../mocks/mock";

describe('<CartList />', () => {
    it('should render the cart list', () => {
        const cartProviderProps = {
            ...CartContextDefaultValues,
            items: cartListMock,
            total: 'R$ 330,00'
        };

        const { container } = render(<CartList />, { cartProviderProps });

        expect(screen.getAllByRole('heading')).toHaveLength(2);
        expect(screen.getByText('R$ 330,00')).toHaveStyle({ color: '#F231A5' });

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render the button', () => {
        const cartProviderProps = {
            ...CartContextDefaultValues,
            items: cartListMock,
        };

        render(<CartList hasButton />, { cartProviderProps });

        expect(screen.getByText(/buy it now/i)).toBeInTheDocument();
    });

    it('should render loading', () => {
        const cartProviderProps = {
            ...CartContextDefaultValues,
            loading: true
        };

        render(<CartList hasButton />, { cartProviderProps });

        expect(screen.getByTitle(/loading/i)).toBeInTheDocument();
    });

    it('should render empty if there are no games', () => {
        render(<CartList />);

        expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
        expect(screen.queryByText(/total/i)).not.toBeInTheDocument();
    });
});