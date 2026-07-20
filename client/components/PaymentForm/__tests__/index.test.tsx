import { render, screen, waitFor } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import PaymentForm from '@/components/PaymentForm';
import { createPaymentIntent } from "utils/stripe/methods";
import { Session } from "next-auth";
import { CartContextData, CartContextDefaultValues } from "@/hooks/useCart";
import cartListMock from "@/components/CartList/mocks/mock";

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

jest.mock("next/link", () => ({
    __esModule: true,
    default: function Mock({ children }: { children: React.ReactNode }) {
        return <div>{children}</div>;
    },
}));

jest.mock("@stripe/react-stripe-js", () => ({
    CardElement: function Mock({ children }: { children: React.ReactNode }) {
        return <div data-testid="Mock CardElement">{children}</div>;
    },
    Elements: function Mock({ children }: { children: React.ReactNode }) {
        return <div data-testid="Mock Elements">{children}</div>;
    },
    useStripe: jest.fn().mockReturnValue({
        confirmCardPayment: jest.fn().mockResolvedValue({
            paymentMethod: {
                card: "card",
            },
        }),
    }),
    useElements: jest.fn().mockReturnValue({
        getElement: jest.fn(),
    }),
}));

jest.mock("@/utils/stripe/methods", () => ({
    createPaymentIntent: jest.fn(),
}));

describe("<PaymentForm />", () => {
    let session: Session;
    let cartProviderProps: CartContextData;

    beforeEach(() => {
        session = {
            user: {
                email: "won@games.com",
                jwt: "token",
            },
            expires: "13234",
        };

        cartProviderProps = {
            ...CartContextDefaultValues,
            items: cartListMock,
        };
    });

    it("should render the component correctly", () => {
        render(<PaymentForm session={session} />);

        expect(
            screen.getByRole("heading", { name: /Payment/i })
        ).toBeInTheDocument();

        expect(screen.getByTestId(/Mock CardElement/i)).toBeInTheDocument();

        expect(screen.getByRole("button", { name: /buy now/i })).toBeDisabled();
    });

    it("should call createPayment when it renders and render free if gets freeGames", async () => {
        (createPaymentIntent as jest.Mock).mockResolvedValueOnce({ freeGames: true });

        render(<PaymentForm session={session} />, { cartProviderProps });

        expect(createPaymentIntent).toHaveBeenCalled();

        await waitFor(() => {
            expect(
                screen.getByText(/Only free games, click buy and enjoy!/i)
            ).toBeInTheDocument();
        });
    });
});