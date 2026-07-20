import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import OrdersList from "@/components/OrdersList";
import ordersListMock from "../mocks/mock";

jest.mock('@/components/Empty', () => ({
    __esModule: true,
    default: function Mock() {
        return <div data-testid="Mock Empty" />
    }
}))

jest.mock('@/components/GameItem', () => ({
    __esModule: true,
    default: function Mock({ children }: { children: React.ReactNode }) {
        return <div data-testid="Mock GameItem">{children}</div>
    }
}))

describe('<OrdersList />', () => {
    it('should render the game items', () => {
        render(<OrdersList items={ordersListMock} />);

        expect(
            screen.getByRole('heading', { name: /my orders/i })
        ).toBeInTheDocument();

        expect(screen.getAllByTestId('Mock GameItem')).toHaveLength(2);
    });

    it('should render empty state', () => {
        render(<OrdersList />);

        expect(screen.getByTestId('Mock Empty')).toBeInTheDocument();
    });
});