import { CartContext, CartContextData, CartContextDefaultValues } from "@/hooks/useCart";
import { WishlistContext, WishlistContextData, WishlistContextDefaultValues } from "@/hooks/useWishlist";
import { theme } from "@/public/styles/theme";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

type CustomRenderProps = {
    cartProviderProps?: CartContextData;
    wishlistProviderProps?: WishlistContextData;
} & Omit<RenderOptions, 'queries'>;

const customRender = (
    ui: React.ReactElement,
    {
        cartProviderProps = CartContextDefaultValues,
        wishlistProviderProps = WishlistContextDefaultValues,
        ...renderOptions
    }: CustomRenderProps = {}
) => render(
    <ThemeProvider theme={theme}>
        <CartContext.Provider value={cartProviderProps}>
            <WishlistContext.Provider value={wishlistProviderProps}>
                {ui}
            </WishlistContext.Provider>
        </CartContext.Provider>
    </ThemeProvider>,
    renderOptions
);

export * from "@testing-library/react";
export { customRender as render };