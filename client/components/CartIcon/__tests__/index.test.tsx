import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import CartIcon from "@/components/CartIcon";
import { CartContextDefaultValues } from "@/hooks/useCart";

describe('<CartIcon />', () => {
    it('should render without badge', () => {
        render(<CartIcon />);

        expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument();
        expect(screen.queryByLabelText(/cart items/i)).not.toBeInTheDocument();
    });

    it('should render with badge', () => {
        render(<CartIcon />, {
            cartProviderProps: { ...CartContextDefaultValues, quantity: 3 }
        });

        expect(screen.getByLabelText(/cart items/i)).toBeInTheDocument();
        expect(screen.getByText(/3/)).toBeInTheDocument();
    });
});