import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import CartDropdown from "@/components/CartDropdown";
import { CartContextDefaultValues } from "@/hooks/useCart";
import cartListMock from "@/components/CartList/mocks/mock";

const cartProviderProps = {
    ...CartContextDefaultValues,
    items: cartListMock,
    quantity: cartListMock.length,
    total: 'R$ 300,00'
};

describe('<CartDropdown />', () => {
    it('should render <CartIcon /> and its badge', () => {
        render(<CartDropdown />, { cartProviderProps });
        expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument();
        expect(screen.getByText(`${cartListMock.length}`)).toBeInTheDocument();
    });

    it('should render Dropdown content with cart items and total', () => {
        render(<CartDropdown />, { cartProviderProps });
        expect(screen.getByText('R$ 300,00')).toBeInTheDocument();
        expect(screen.getByText(`${cartListMock[0].title}`)).toBeInTheDocument();
    });
});